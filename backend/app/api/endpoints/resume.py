from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.services.parser import parse_resume
from app.services.analyzer import analyze_resume
from app.services.matcher import match_resume_to_job
from app.services.optimizer import optimize_resume_bullets
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter()

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    # current_user: User = Depends(get_current_user) # Commented out for easier testing without auth
):
    """
    Uploads a resume, parses it, and returns the extracted text and AI analysis.
    """
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")
        
    content = await file.read()
    
    # 1. Parse
    text = parse_resume(content, file.filename)
    if not text:
        raise HTTPException(status_code=500, detail="Failed to parse document.")
        
    # 2. Analyze
    analysis = analyze_resume(text)
    
    return {
        "filename": file.filename,
        "analysis": analysis,
        # "text": text # optionally return raw text
    }

@router.post("/match")
async def match_job(
    resume_skills: list[str],
    job_description: str
):
    """
    Matches a list of resume skills against a job description.
    """
    result = match_resume_to_job(resume_skills, job_description)
    return result

@router.post("/optimize")
async def optimize_bullets(bullets: list[str]):
    """
    Rewrites bullet points using STAR method and quantifies achievements.
    """
    return optimize_resume_bullets(bullets)
