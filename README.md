# TALENTPILOT AI - From Resume to Offer

![TalentPilot AI](https://via.placeholder.com/1200x600.png?text=TalentPilot+AI)

Build a complete production-grade SaaS platform that helps candidates improve resumes, prepare for interviews, track applications, identify skill gaps, learn required skills, predict hiring success, and secure better job offers.

## Features

- **AI Resume Optimizer**: Analyzes and rewrites bullet points using the STAR method.
- **RAG Knowledge System**: Interactive career guidance based on embedded documents via ChromaDB.
- **Interview Copilot**: Generates tailored Technical and Behavioral interview questions, with AI-driven grading.
- **Career Roadmap**: Generates structured, month-by-month learning pathways to achieve target roles.
- **Application Tracker**: Kanban pipeline to track job applications from applied to offer.
- **ML Hiring Predictor**: Predicts interview and offer probabilities based on ATS scoring and skill mapping.
- **Real-Time Dashboards**: Powered by WebSockets to push live updates to the user.

## Architecture & Tech Stack

### Frontend
- **Next.js 14 (App Router)**
- **React 18 & TypeScript**
- **Tailwind CSS & Framer Motion** (Professional Pastel SaaS Design)
- **Recharts** (Data Visualization)

### Backend
- **FastAPI (Python 3.11)**
- **PostgreSQL** (User & Application Data)
- **Redis** (Caching & Pub/Sub)
- **ChromaDB** (Local Vector Database for RAG)
- **LangChain & OpenAI** (LLM Orchestration)
- **Scikit-learn & Numpy** (ML Prediction Pipelines)
- **PyPDF2 & python-docx** (Resume parsing)
- **WebSockets** (Real-time events)

### DevOps & CI/CD
- **Docker & Docker Compose**
- **GitHub Actions**

## Project Structure

```bash
AI-Recruitment-Intelligence-Platform/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── api/              # API Endpoints (Resume, ML, Interview, RAG, WebSockets)
│   │   ├── core/             # Security (JWT) & Config
│   │   ├── db/               # SQLAlchemy Models & Sessions
│   │   ├── ml/               # Machine Learning Prediction Models
│   │   └── services/         # Business Logic (Langchain, Resume Parsing)
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # App Router (Dashboard, Landing, Auth)
│   │   ├── components/       # Shared UI (Logo, Splash Screen, Widgets)
│   │   └── lib/              # Utility functions
│   └── Dockerfile
├── docker-compose.yml        # PostgreSQL & Redis Infrastructure
└── README.md
```

## Setup Guide

### 1. Infrastructure (Database & Cache)
Make sure Docker is running, then run:
```bash
docker compose up -d
```
This starts PostgreSQL on port `5432` and Redis on `6379`.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation will be available at: `http://localhost:8000/docs`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The web app will be available at: `http://localhost:3000`

## Future Scope
- Integration with external Job APIs (TheirStack, USAJobs).
- Fully interactive Excalidraw System Design Labs embedded in the Learning Hub.
- Fine-tuned open-source LLMs (Llama 3) for cost-effective private processing.
