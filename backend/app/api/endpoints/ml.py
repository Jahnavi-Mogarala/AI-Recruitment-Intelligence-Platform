from fastapi import APIRouter
from app.ml.models import classifier, predictor

router = APIRouter()

@router.post("/predict-role")
async def predict_role(skills: list[str], text: str):
    """
    Predicts the best job role for the candidate based on skills and resume text.
    """
    role = classifier.predict(skills, text)
    return {"predicted_role": role}

@router.post("/predict-success")
async def predict_success(ats_score: int, num_skills: int):
    """
    Predicts interview and offer probabilities.
    """
    return predictor.predict(ats_score, num_skills)
