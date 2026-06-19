from fastapi import APIRouter
from app.services.interview import generate_interview_questions, evaluate_interview_answer

router = APIRouter()

@router.post("/generate-questions")
async def get_questions(target_role: str, experience_level: str, company: str = "general"):
    """
    Generates tailored interview questions.
    """
    return generate_interview_questions(target_role, experience_level, company)

@router.post("/evaluate-answer")
async def evaluate_answer(question: str, answer: str):
    """
    Evaluates a candidate's answer and provides feedback.
    """
    return evaluate_interview_answer(question, answer)
