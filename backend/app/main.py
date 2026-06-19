from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.endpoints import resume, ml, interview, rag, roadmap, websockets
from app.db.base_class import Base
from app.db.session import engine

# Create database tables (gracefully fail if DB is unreachable in MVP)
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not connect to database during startup. {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to TALENTPILOT AI API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

app.include_router(resume.router, prefix=f"{settings.API_V1_STR}/resume", tags=["Resume"])
app.include_router(ml.router, prefix=f"{settings.API_V1_STR}/ml", tags=["Machine Learning"])
app.include_router(interview.router, prefix=f"{settings.API_V1_STR}/interview", tags=["Interview Copilot"])
app.include_router(rag.router, prefix=f"{settings.API_V1_STR}/rag", tags=["RAG Knowledge Base"])
app.include_router(roadmap.router, prefix=f"{settings.API_V1_STR}/roadmap", tags=["Career Roadmap"])
app.include_router(websockets.router, tags=["WebSockets"])
