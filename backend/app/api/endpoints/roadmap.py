from fastapi import APIRouter
from app.services.roadmap import generate_career_roadmap

router = APIRouter()

@router.post("/generate")
async def get_roadmap(target_role: str, current_skills: list[str]):
    """
    Generates a career learning roadmap.
    """
    return generate_career_roadmap(target_role, current_skills)
