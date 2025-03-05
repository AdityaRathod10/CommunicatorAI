import os
import tempfile
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from googletrans import Translator
import whisper
import spacy
import chromadb
from chromadb.utils import embedding_functions
from dotenv import load_dotenv
from linkedin_api import Linkedin

# Load environment variables
load_dotenv()

# Retrieve API keys and credentials from environment
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
LINKEDIN_EMAIL = os.getenv('LINKEDIN_EMAIL')
LINKEDIN_PASSWORD = os.getenv('LINKEDIN_PASSWORD')

# Validate environment variables
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY environment variable is not set")
if not LINKEDIN_EMAIL or not LINKEDIN_PASSWORD:
    raise ValueError("LinkedIn credentials are not set")

# Initialize APIs
genai.configure(api_key=GEMINI_API_KEY)
linkedin = Linkedin(LINKEDIN_EMAIL, LINKEDIN_PASSWORD)

# ML Models and Clients
model = genai.GenerativeModel('gemini-2.0-flash')
whisper_model = whisper.load_model("base")
nlp = spacy.load("en_core_web_sm")
translator = Translator()
client = chromadb.Client()
collection = client.get_or_create_collection(name="real_estate_conversations")
embedding_fn = embedding_functions.DefaultEmbeddingFunction()

# FastAPI App
app = FastAPI(title="Real Estate Conversation and Customer Analysis Assistant")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class ConversationQuery(BaseModel):
    query_text: str
    n_results: int = 3

class CustomerAnalysisRequest(BaseModel):
    first_name: str
    last_name: str = None

# Response Models
class CustomerAnalysisResponse(BaseModel):
    description: str
    real_estate_assessment: str

class ConversationProcessResponse(BaseModel):
    conversation_id: str
    translated_text: str
    key_details: dict
    suggestion: str

# Utility Functions
def transcribe_audio(audio_path):
    """Transcribe audio using Whisper ASR."""
    result = whisper_model.transcribe(audio_path)
    return result['text']

def translate_text(text, dest_language='en'):
    """Translate text to English (or any other language)."""
    translated = translator.translate(text, dest=dest_language)
    return translated.text

def extract_key_details(text):
    """Extract key details using spaCy NLP and Gemini API."""
    doc = nlp(text)
    key_details = {
        "location": None,
        "property_type": None,
        "budget": None,
        "timeline": None,
        "sentiment": {"label": "neutral", "score": 0.0},  # Sentiment analysis
        "urgency": {"label": "low", "score": 0.0},  # Urgency analysis
        "buying_intent": {"label": "low", "score": 0.0},  # Buying intent analysis
        "interest_level": {"label": "low", "score": 0.0}  # Interest level analysis
    }

    # Extract entities (location, budget, property type, timeline)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            key_details["location"] = ent.text
        elif ent.label_ == "MONEY":
            key_details["budget"] = ent.text
        elif "BHK" in ent.text:
            key_details["property_type"] = ent.text
        elif "month" in ent.text or "day" in ent.text:
            key_details["timeline"] = ent.text

    # Sentiment Analysis
    sentiment_response = model.generate_content(f"Analyze the sentiment of the following text and return only a numerical score between -1 and 1: {text}")
    sentiment_score = float(sentiment_response.text)
    key_details["sentiment"]["score"] = sentiment_score
    if sentiment_score > 0.2:
        key_details["sentiment"]["label"] = "positive"
    elif sentiment_score < -0.2:
        key_details["sentiment"]["label"] = "negative"

    # Urgency Analysis
    urgency_response = model.generate_content(f"Analyze the urgency in the following text and return a numerical score between 0 and 1: {text}")
    urgency_score = float(urgency_response.text)
    key_details["urgency"]["score"] = urgency_score
    if urgency_score > 0.7:
        key_details["urgency"]["label"] = "high"
    elif urgency_score > 0.4:
        key_details["urgency"]["label"] = "medium"

    # Buying Intent Analysis
    buying_intent_response = model.generate_content(f"Analyze the buying intent in the following text and return a numerical score between 0 and 1: {text}")
    buying_intent_score = float(buying_intent_response.text)
    key_details["buying_intent"]["score"] = buying_intent_score
    if buying_intent_score > 0.7:
        key_details["buying_intent"]["label"] = "high"
    elif buying_intent_score > 0.4:
        key_details["buying_intent"]["label"] = "medium"

    # Interest Level Analysis
    interest_level_response = model.generate_content(f"Analyze the interest level in the following text and return a numerical score between 0 and 1: {text}")
    interest_level_score = float(interest_level_response.text)
    key_details["interest_level"]["score"] = interest_level_score
    if interest_level_score > 0.7:
        key_details["interest_level"]["label"] = "high"
    elif interest_level_score > 0.4:
        key_details["interest_level"]["label"] = "medium"

    return key_details

def generate_real_time_suggestion(context):
    """Generate real-time suggestions using Gemini API."""
    prompt = f"You are a real estate assistant. Based on the following conversation, provide a suggestion for the agent: make it concise and with good readability give numerical values and scores too \n\n{context}"
    response = model.generate_content(prompt)
    return response.text

def log_conversation(client_name, transcript, translated_text, key_details, follow_up):
    """Log conversation details in ChromaDB."""
    conversation_id = f"conv_{len(collection.get()['ids']) + 1}"
    collection.add(
        ids=[conversation_id],
        embeddings=embedding_fn([translated_text]),
        metadatas=[{
            "client_name": client_name,
            "transcript": transcript,
            "translated_text": translated_text,
            "key_details": str(key_details),
            "follow_up": follow_up
        }]
    )
    return conversation_id

def query_similar_conversations(query_text, n_results=3):
    """Query ChromaDB for similar conversations."""
    results = collection.query(
        query_embeddings=embedding_fn([query_text]),
        n_results=n_results
    )
    return results

# Endpoints
@app.post("/transcribe-audio/", response_model=dict)
async def process_audio(file: UploadFile = File(...)):
    """Endpoint to transcribe audio file."""
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        transcript = transcribe_audio(temp_file_path)
        os.unlink(temp_file_path)

        return {"transcript": transcript}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/process-conversation/", response_model=ConversationProcessResponse)
async def process_conversation(
    client_name: str, 
    transcript: str, 
    follow_up: str = "Follow up in 2 days"
):
    """Endpoint to process and log conversation."""
    try:
        translated_text = translate_text(transcript)
        key_details = extract_key_details(translated_text)
        suggestion = generate_real_time_suggestion(translated_text)
        
        conversation_id = log_conversation(
            client_name, 
            transcript, 
            translated_text, 
            key_details, 
            follow_up
        )
        
        return {
            "conversation_id": conversation_id,
            "translated_text": translated_text,
            "key_details": key_details,  # Structured data for frontend
            "suggestion": suggestion
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query-conversations/", response_model=dict)
async def query_conversations(query: ConversationQuery):
    """Endpoint to query similar conversations."""
    try:
        similar_conversations = query_similar_conversations(
            query.query_text, 
            query.n_results
        )
        
        return {
            "similar_conversations": [
                {
                    "client_name": metadata['client_name'],
                    "transcript": metadata['transcript'],
                    "translated_text": metadata['translated_text'],
                    "key_details": eval(metadata['key_details']),
                    "follow_up": metadata['follow_up']
                }
                for metadata in similar_conversations['metadatas'][0]
            ]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class CustomerAnalysisRequest(BaseModel):
    first_name: str
    last_name: str

class CustomerAnalysisResponse(BaseModel):
    description: str
    real_estate_assessment: str
    experience_years: int
    skills: list
    education: list
    investment_potential: float

@app.post("/analyze_customer", response_model=CustomerAnalysisResponse)
def customer_analysis(request: CustomerAnalysisRequest):
    """Endpoint for LinkedIn customer profile analysis with structured data."""
    first_name = request.first_name
    last_name = request.last_name

    try:
        # Search LinkedIn for the user profile
        results = linkedin.search_people(keyword_first_name=first_name, keyword_last_name=last_name, limit=1)

        if not results:
            raise HTTPException(status_code=404, detail="LinkedIn profile not found.")

        profile = linkedin.get_profile(urn_id=results[0]['urn_id'])

    except Exception as e:
        print("LinkedIn API Error:", e)
        raise HTTPException(status_code=500, detail="Error fetching LinkedIn profile.")

    # Generate profile description
    response1 = model.generate_content(
        f"Turn this messy JSON description of a person's LinkedIn profile into a neat, readable plaintext description:\n{profile}"
    )
    description_text = response1.text if response1 else "Error generating description."

    # Generate real estate assessment
    response2 = model.generate_content(
        f"Based on this profile description, assess the person as a potential real estate customer. "
        f"Provide a summary and an investment potential score (0-100):\n{description_text}"
    )
    assessment_text = response2.text if response2 else "Error generating assessment."

    # Extract structured data for graphs
    experience_years = len(profile.get("experience", []))  # Count of experience entries
    skills = [skill["name"] for skill in profile.get("skills", [])]
    education = [edu["schoolName"] for edu in profile.get("education", [])]
    
    # Extract investment potential score from text
    investment_potential = 50.0  # Default score if extraction fails
    for line in assessment_text.split("\n"):
        if "score" in line.lower():
            try:
                investment_potential = float(line.split()[-1])
                break
            except ValueError:
                continue

    return CustomerAnalysisResponse(
        description=description_text,
        real_estate_assessment=assessment_text,
        experience_years=experience_years,
        skills=skills,
        education=education,
        investment_potential=investment_potential
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

