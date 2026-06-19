import json
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from app.core.config import settings
import os

# Set dummy key for local dev if not present, but in prod we need a real one
os.environ["OPENAI_API_KEY"] = os.environ.get("OPENAI_API_KEY", "dummy-key-for-now")

def analyze_resume(resume_text: str) -> dict:
    """
    Uses an LLM to analyze the resume text and extract structured insights.
    Returns a dictionary with ATS Score, Skills, Weaknesses, etc.
    """
    
    # In a real scenario, this uses an actual LLM. 
    # If using a dummy key, we return mocked data to prevent crashes during development.
    if os.environ.get("OPENAI_API_KEY") == "dummy-key-for-now":
        return {
            "ats_score": 75,
            "skills": ["Python", "FastAPI", "React", "SQL"],
            "missing_sections": ["Certifications", "Summary"],
            "weaknesses": ["Bullet points lack quantifiable metrics.", "Formatting is inconsistent."],
            "recommendations": ["Add metrics to project descriptions.", "Include a professional summary."]
        }

    try:
        llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert AI Resume Reviewer and ATS System.
Analyze the following resume text. Respond in valid JSON format ONLY, with the following keys:
- "ats_score": (integer 0-100)
- "skills": (list of strings)
- "missing_sections": (list of strings)
- "weaknesses": (list of strings)
- "recommendations": (list of strings)
"""),
            ("user", "{resume_text}")
        ])
        
        chain = prompt | llm
        result = chain.invoke({"resume_text": resume_text})
        
        # Parse JSON
        return json.loads(result.content)
    except Exception as e:
        print(f"Error in LLM analysis: {e}")
        return {
            "error": "Failed to analyze resume.",
            "ats_score": 0,
            "skills": []
        }
