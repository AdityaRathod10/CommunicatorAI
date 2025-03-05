
import google.generativeai as genai
from googletrans import Translator
import whisper
from tqdm import tqdm
import spacy
import chromadb
from chromadb.utils import embedding_functions

genai.configure(api_key="AIzaSyDsMerGdK4lbbgIdoIcmSvqlfwAR1jY9X0")

models = genai.list_models()
for model in models:
    print(model.name)

model = genai.GenerativeModel('gemini-2.0-flash')


whisper_model = whisper.load_model("base")
nlp = spacy.load("en_core_web_sm")
translator = Translator()
client = chromadb.Client()
collection = client.get_or_create_collection(name="real_estate_conversations")
embedding_fn = embedding_functions.DefaultEmbeddingFunction()

def transcribe_audio(audio_path):
    """Transcribe audio using Whisper ASR."""
    print("Transcribing audio...")
    result = whisper_model.transcribe(audio_path)
    return result['text']

def translate_text(text, dest_language='en'):
    """Translate text to English (or any other language)."""
    print("Translating text...")
    translated = translator.translate(text, dest=dest_language)
    return translated.text

def extract_key_details(text):
    """Extract key details using spaCy NLP."""
    print("Extracting key details...")
    doc = nlp(text)
    key_details = {
        "location": None,
        "property_type": None,
        "budget": None,
        "timeline": None
    }


    for ent in doc.ents:
        if ent.label_ == "GPE":
            key_details["location"] = ent.text
        elif ent.label_ == "MONEY":
            key_details["budget"] = ent.text
        elif "BHK" in ent.text:
            key_details["property_type"] = ent.text
        elif "month" in ent.text or "day" in ent.text:
            key_details["timeline"] = ent.text

    return key_details

def generate_real_time_suggestion(context):
    """Generate real-time suggestions using Gemini API."""
    print("Generating real-time suggestions...")
    prompt = f"You are a real estate assistant. Based on the following conversation, provide a suggestion for the agent:\n\n{context}"
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
    print("Conversation logged successfully.")

from google.colab import files
uploaded = files.upload()


audio_path = list(uploaded.keys())[0]
print(f"Uploaded file: {audio_path}")

transcript = transcribe_audio(audio_path)
print(f"Transcript: {transcript}")
translated_text = translate_text(transcript, dest_language='en')
print(f"Translated Text: {translated_text}")

key_details = extract_key_details(translated_text)
print(f"Key Details: {key_details}")
suggestion = generate_real_time_suggestion(translated_text)
print(f"Real-time Suggestion: {suggestion}")
client_name = "Client X"
follow_up = "Follow up in 2 days with property listings."
log_conversation(client_name, transcript, translated_text, key_details, follow_up)


for _ in tqdm(range(100), desc="Processing complete"):
    pass

def query_similar_conversations(query_text, n_results=3):
    """Query ChromaDB for similar conversations."""
    results = collection.query(
        query_embeddings=embedding_fn([query_text]),
        n_results=n_results
    )
    return results

# Example query
query_text = "2BHK in Pune"
similar_conversations = query_similar_conversations(query_text)

print("\nSimilar Conversations:")
for i, metadata in enumerate(similar_conversations['metadatas'][0]):
    print(f"\nResult {i + 1}:")
    print(f"Client Name: {metadata['client_name']}")
    print(f"Transcript: {metadata['transcript']}")
    print(f"Translated Text: {metadata['translated_text']}")
    print(f"Key Details: {metadata['key_details']}")
    print(f"Follow-up: {metadata['follow_up']}")

