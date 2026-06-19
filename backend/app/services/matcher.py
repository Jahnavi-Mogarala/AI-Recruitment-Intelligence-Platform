def match_resume_to_job(resume_skills: list[str], job_description: str) -> dict:
    """
    Matches the extracted resume skills against a job description.
    For MVP, uses simple keyword matching. In production, this uses SentenceTransformers.
    """
    jd_lower = job_description.lower()
    
    matched_skills = []
    missing_skills = []
    
    # In a real implementation, we would extract skills from the JD first
    # For now, we see which of the candidate's skills appear in the JD
    for skill in resume_skills:
        if skill.lower() in jd_lower:
            matched_skills.append(skill)
        else:
            missing_skills.append(skill)
            
    # Calculate a simple match percentage
    # (Real world: Use cosine similarity between embeddings)
    match_percentage = 0
    if len(resume_skills) > 0:
        match_percentage = int((len(matched_skills) / len(resume_skills)) * 100)
        
    return {
        "match_percentage": match_percentage,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "readiness_score": min(match_percentage + 10, 100) # simple heuristic
    }
