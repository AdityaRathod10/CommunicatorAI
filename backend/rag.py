transcript="""Agent:
"Hello, thank you for reaching out to us! How can I assist you today?"

Client:"Namaste! Main Pune mein 2BHK flat dhoondh raha hoon. Mera budget 80 lakh tak hai."
(Translation: "Hello! I’m looking for a 2BHK flat in Pune. My budget is up to 80 lakhs.")

Agent:"Got it! Are you looking for a ready-to-move-in property, or are you okay with under-construction projects?"

Client:
"Ready-to-move-in chahiye. Main agle 3 mahine mein shift hona chahta hoon."
(Translation: "I want a ready-to-move-in property. I want to shift in the next 3 months.")

Agent:"Understood. Do you have any specific areas in Pune in mind? Like Kothrud, Hinjewadi, or Baner?"

Client:
"Haan, Kothrud ya Baner mein dekh sakte hain. Par society mein accha park aur security hona chahiye."
(Translation: "Yes, we can look in Kothrud or Baner. But the society should have a good park and security.")

Agent:"Sure, I’ll note that down. Do you need any assistance with home loans or legal paperwork?"

Client:"Home loan ki zarurat ho sakti hai. Legal paperwork ke baare mein aap hi bata dena."
(Translation: "I might need a home loan. You can guide me about the legal paperwork.")

Agent:"Absolutely! I’ll send you some options by tomorrow. Can you share your email ID or phone number for follow-ups?"

Client:"Haan, mera email ID hai clientx@example.com aur phone number 9876543210 hai."
(Translation: "Yes, my email ID is clientx@example.com, and my phone number is 9876543210.")

Agent:"Thank you! I’ll get back to you soon with some great options. Have a nice day!"

Client:"Dhanyavaad! Aapka bhi din accha rahe."
(Translation: "Thank you! Have a nice day too.") """

from langchain.vectorstores import FAISS
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
import os
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain.chains import RetrievalQA


load_dotenv()
key=os.getenv("GEMINI_API_KEY")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=key)

def query_city_data(transcript):
    flag = 0
    words = transcript.lower().split()
    if "pune" in words:
        vector_db = FAISS.load_local("Pune", embeddings, allow_dangerous_deserialization=True)
    elif "mumbai" in words:  # Use elif since only one city should match
        vector_db = FAISS.load_local("Mumbai", embeddings, allow_dangerous_deserialization=True)
    else:
        flag = 1
        return "No city recognized in the transcript. Please mention 'Pune' or 'Mumbai'."

    retriever = vector_db.as_retriever(search_kwargs={"k": 10})
    llm = ChatGoogleGenerativeAI(model="models/gemini-2.0-flash-lite", temperature=0.2, google_api_key=key)

    # Updated prompt template with context
    prompt_template = ChatPromptTemplate.from_messages([
        ("system", "You are a highly knowledgeable real estate agent. Use the following context to make data based recommendatuions to clients: {context}"),
        ("user", "{question}")
    ])

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        chain_type_kwargs={"prompt": prompt_template, "document_variable_name": "context"}
    )

    query = "Provide some advice to offer to my client in this conversation: {transcript}"
    response = qa_chain.run({"query": query})
    return response



print(query_city_data(transcript))
