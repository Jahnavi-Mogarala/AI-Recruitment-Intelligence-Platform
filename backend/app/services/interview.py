import json
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

def generate_interview_questions(target_role: str, experience_level: str, company: str = "general") -> list[dict]:
    """
    Generates a list of interview questions tailored to the role, experience, and company.
    """
    if os.environ.get("OPENAI_API_KEY") == "dummy-key-for-now":
        return [
            {"question": f"Can you describe your experience with {target_role}?", "type": "Behavioral"},
            {"question": "How do you handle technical debt?", "type": "Technical"},
            {"question": f"Why do you want to work at {company}?", "type": "HR"}
        ]
        
    try:
        llm = ChatOpenAI(temperature=0.7, model_name="gpt-3.5-turbo")
        
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are an expert technical interviewer at {company}.
Generate exactly 5 interview questions for a {experience_level} {target_role}.
Include a mix of Technical, Behavioral, and System Design questions.
Respond strictly in JSON format as a list of objects with "question" and "type" keys."""),
            ("user", "Generate the questions.")
        ])
        
        chain = prompt | llm
        result = chain.invoke({
            "company": company,
            "experience_level": experience_level,
            "target_role": target_role
        })
        
        return json.loads(result.content)
    except Exception as e:
        print(f"Error generating questions: {e}")
        return []
        
def evaluate_interview_answer(question: str, answer: str) -> dict:
    """
    Evaluates a candidate's answer to an interview question.
    """
    if os.environ.get("OPENAI_API_KEY") == "dummy-key-for-now":
        return {
            "score": 80,
            "feedback": "Good answer, but could be more structured.",
            "improvement": "Try using the STAR method."
        }
        
    try:
        llm = ChatOpenAI(temperature=0, model_name="gpt-3.5-turbo")
        prompt = ChatPromptTemplate.from_messages([
            ("system", """You are evaluating an interview answer. 
Rate the answer out of 100.
Respond strictly in JSON format with keys: "score" (int), "feedback" (string), "improvement" (string)."""),
            ("user", "Question: {question}\nAnswer: {answer}")
        ])
        
        chain = prompt | llm
        result = chain.invoke({"question": question, "answer": answer})
        return json.loads(result.content)
    except Exception:
        return {"score": 0, "feedback": "Error evaluating answer.", "improvement": ""}
