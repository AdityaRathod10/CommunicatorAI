from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from linkedin_api import Linkedin    # Installed as linkedin-api
import google.generativeai as genai  # Correct import for Gemini AI
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
LINKEDIN_EMAIL = os.getenv("LINKEDIN_EMAIL")
LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD")

# Ensure API key is available
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing. Set it in the .env file.")

# Initialize LinkedIn API
linkedin = Linkedin(LINKEDIN_EMAIL, LINKEDIN_PASSWORD)

# Initialize FastAPI
app = FastAPI()

# Define request model
class CustomerAnalysisRequest(BaseModel):
    first_name: str
    last_name: str = None

# Define response model
class CustomerAnalysisResponse(BaseModel):
    description: str
    real_estate_assessment: str

@app.post("/analyze_customer", response_model=CustomerAnalysisResponse)
def customer_analysis(request: CustomerAnalysisRequest):
    first_name = request.first_name
    last_name = request.last_name

    try:
        # Search LinkedIn for the user profile
        if last_name:
            results = linkedin.search_people(keyword_first_name=first_name, keyword_last_name=last_name, limit=1)
        else:
            results = linkedin.search_people(keyword_first_name=first_name, limit=1)

        if not results:
            raise HTTPException(status_code=404, detail="LinkedIn profile not found.")

        profile = linkedin.get_profile(urn_id=results[0]['urn_id'])

    except Exception as e:
        print("LinkedIn API Error:", e)
        raise HTTPException(status_code=500, detail="Error fetching LinkedIn profile.")

    # Initialize Gemini AI Client
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel("gemini-2.0-flash")

    # Generate profile description
    response1 = model.generate_content(
        f"Turn this messy JSON description of a person's LinkedIn profile into a neat, readable plaintext description:\n{profile}"
    )
    description_text = response1.text if response1 else "Error generating description."

    # Generate real estate assessment
    response2 = model.generate_content(
        f"Based on this profile description, assess the person as a potential real estate customer:\n{description_text}"
    )
    assessment_text = response2.text if response2 else "Error generating assessment."

    return CustomerAnalysisResponse(
        description=description_text,
        real_estate_assessment=assessment_text
    )
