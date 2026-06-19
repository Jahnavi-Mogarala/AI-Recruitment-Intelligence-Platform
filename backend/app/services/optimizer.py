from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
import os
import json

def optimize_resume_bullets(bullets: list[str]) -> list[dict]:
    """
    Takes a list of resume bullets and rewrites them using the STAR method
    and quantifies achievements.
    Returns a list of dicts: [{"original": "...", "improved": "...", "score": 85}]
    """
    if os.environ.get("OPENAI_API_KEY") == "dummy-key-for-now":
        return [
            {
                "original": bullet,
                "improved": f"Optimized version of: {bullet}. Improved using STAR method, resulting in 40% more impact.",
                "score": 85
            }
            for bullet in bullets
        ]
        
    try:
        llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert Resume Writer. Your task is to rewrite bullet points to be stronger, 
using the STAR method (Situation, Task, Action, Result) where possible, and quantifying achievements.
Respond ONLY with a valid JSON array of objects. Each object must have:
"original" (the original bullet),
"improved" (the rewritten bullet),
"score" (integer 0-100 indicating the improvement of the new bullet)"""),
            ("user", "Bullets to improve:\n{bullets}")
        ])
        
        chain = prompt | llm
        result = chain.invoke({"bullets": json.dumps(bullets)})
        
        return json.loads(result.content)
    except Exception as e:
        print(f"Error optimizing bullets: {e}")
        return []
