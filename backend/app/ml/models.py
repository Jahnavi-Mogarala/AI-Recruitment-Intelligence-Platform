
class ResumeClassifier:
    """
    Mock classification model. 
    In production, this loads a trained Scikit-learn or XGBoost model.
    """
    def __init__(self):
        self.roles = [
            "Frontend Developer", "Backend Developer", "Full Stack Developer", 
            "ML Engineer", "Data Scientist", "DevOps Engineer"
        ]
        
    def predict(self, skills: list[str], text: str) -> str:
        # Simple heuristic for MVP
        text_lower = text.lower()
        if "react" in text_lower or "frontend" in text_lower:
            return "Frontend Developer"
        elif "machine learning" in text_lower or "pytorch" in text_lower:
            return "ML Engineer"
        elif "docker" in text_lower or "kubernetes" in text_lower:
            return "DevOps Engineer"
        return "Full Stack Developer"

class SuccessPredictor:
    """
    Predicts interview and offer probabilities based on ATS score and skills length.
    """
    def predict(self, ats_score: int, num_skills: int) -> dict:
        # Logistic curve approximation for MVP
        base_prob = min(ats_score / 100.0, 0.95)
        skill_boost = min(num_skills * 0.01, 0.15)
        
        interview_prob = min(base_prob + skill_boost, 0.98)
        offer_prob = max(interview_prob - 0.2, 0.1)
        
        return {
            "interview_probability": round(interview_prob * 100, 1),
            "offer_probability": round(offer_prob * 100, 1)
        }

classifier = ResumeClassifier()
predictor = SuccessPredictor()
