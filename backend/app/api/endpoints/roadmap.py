from fastapi import APIRouter
from app.services.roadmap import generate_career_roadmap

router = APIRouter()

from pydantic import BaseModel

class RoadmapRequest(BaseModel):
    target_role: str
    current_skills: list[str]

@router.post("/generate")
async def get_roadmap(request: RoadmapRequest):
    """
    Generates a career learning roadmap.
    """
    return generate_career_roadmap(request.target_role, request.current_skills)
