import json
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

def generate_career_roadmap(target_role: str, current_skills: list[str]) -> dict:
    """
    Generates a step-by-step career learning roadmap to achieve a target role.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key or api_key == "dummy-key-for-now":
        return {
            "role": target_role,
            "estimated_months": 6,
            "phases": [
                {
                    "name": "Phase 1: Fundamentals",
                    "duration": "2 months",
                    "skills_to_learn": ["Data Structures", "Algorithms"],
                    "resources": ["LeetCode", "Cracking the Coding Interview"]
                },
                {
                    "name": "Phase 2: Core Technologies",
                    "duration": "3 months",
                    "skills_to_learn": ["FastAPI", "React", "Docker"],
                    "resources": ["FastAPI Docs", "React Official Tutorial"]
                }
            ]
        }
        
    try:
        llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert career counselor. 
Given a target role and a list of current skills, generate a learning roadmap.
Respond strictly in JSON format with keys: "role" (string), "estimated_months" (int), "phases" (list of objects with keys: "name", "duration", "skills_to_learn", "resources")."""),
            ("user", f"Target Role: {target_role}\nCurrent Skills: {', '.join(current_skills)}")
        ])
        
        chain = prompt | llm
        result = chain.invoke({})
        return json.loads(result.content)
    except Exception as e:
        print(f"Roadmap Error: {e}")
        return {}
