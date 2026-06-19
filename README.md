  
  <h1>TalentPilot AI: From Resume to Offer</h1>

  
  https://ai-recruitment-intelligence-platfor.vercel.app/
  
  <p>
    <strong>A next-generation, production-grade AI Recruitment Intelligence SaaS</strong><br>
    Elevating the job search experience with AI-powered resume optimization, behavioral interview copilots, intelligent application tracking, and an immersive Premium Interactive Learning Hub.
  </p>

  <p>
    <a href="#features">Features</a> •
    <a href="#premium-labs">Premium Labs</a> •
    <a href="#architecture--tech-stack">Tech Stack</a> •
    <a href="#installation--quick-start">Installation</a> •
    <a href="#license">License</a>
  </p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
  ![FastAPI](https://img.shields.io/badge/FastAPI-Python_3.11-009688?logo=fastapi&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS_3-38B2AC?logo=tailwind-css)
  ![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker)
  ![Status](https://img.shields.io/badge/Status-Production_Ready-success)
</div>

<hr>

## 🚀 The Vision

The modern job search is broken. **TalentPilot AI** provides candidates with an end-to-end, highly scalable platform to master their career trajectory. By merging Large Language Models, Retrieval-Augmented Generation (RAG), and advanced Machine Learning classification, TalentPilot acts as a personal career strategist—helping candidates optimize their resumes, practice live interviews, learn targeted skills, and track their applications until they land the offer.

## ✨ Core Features

- 🧠 **AI Resume Optimizer**: Deep analysis of resumes to rewrite bullet points using the STAR method for maximum ATS compliance and human readability.
- 💬 **RAG Knowledge System**: ChromaDB-backed career guidance agent that answers domain-specific questions by referencing embedded career documents.
- 🎤 **Interview Copilot**: Generates tailored Technical and Behavioral interview questions with real-time AI-driven grading and feedback.
- 🗺️ **Career Roadmap Generator**: Dynamically structures personalized, month-by-month learning pathways to achieve target roles based on the user's current skill gap.
- 📊 **Intelligent Application Tracker**: A rich Kanban pipeline with drag-and-drop capabilities to track job applications from the "Applied" stage all the way to "Offer".
- 📈 **ML Hiring Predictor**: Utilizes Scikit-learn predictive modeling to forecast interview and offer probabilities based on ATS scoring and skill mapping.
- ⚡ **Real-Time Dashboards**: Powered by WebSockets to push live, asynchronous ML updates to the user seamlessly.

---

## 💎 Premium Interactive Labs (NEW!)

We believe in learning by doing. The platform features an incredibly immersive suite of simulated professional environments:

1. 🏛️ **System Design Canvas**: A dedicated architecture design playground featuring an embedded canvas and a live "AI Co-Architect" that provides real-time feedback on concepts like load balancing and points of failure.
2. 🎙️ **AI Behavioral Interviewer**: A voice-to-voice mock interview interface with live audio visualizers. The AI grills candidates on Amazon Leadership Principles using the STAR method and logs a real-time transcript.
3. 💻 **Frontend Architecture Studio**: A live React CodeSandbox environment powered by Monaco Editor. It includes simulated real-time accessibility (a11y) audits and performance profiling by an AI Code Reviewer.

---

## 🏗️ Architecture & Tech Stack

This project is built using a modern, scalable microservice architecture separating the frontend client from the AI-heavy backend.

### 🎨 Frontend (Client)
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript / React 18
- **Styling**: Tailwind CSS & Framer Motion (Delivering a premium pastel SaaS aesthetic)
- **Editor**: Monaco Editor (VS Code core engine)
- **Visualization**: Recharts

### ⚙️ Backend (API & ML)
- **Framework**: FastAPI (Python 3.11) for ultra-fast, async request handling
- **Database**: PostgreSQL (User & Application Data via SQLAlchemy)
- **Caching & Messaging**: Redis (Caching & Pub/Sub)
- **Vector DB**: ChromaDB (Local embeddings for RAG)
- **AI/LLM**: LangChain & OpenAI API (Orchestration)
- **Machine Learning**: Scikit-learn & Numpy (Prediction Pipelines)
- **Parsing**: PyPDF2 & python-docx (ATS parsing)
- **Real-Time**: WebSockets

### ☁️ DevOps & CI/CD
- **Containerization**: Docker & Docker Compose
- **Workflows**: GitHub Actions (Linting, Pytest, Next.js build validation)

---

## 📁 Project Structure

```bash
AI-Recruitment-Intelligence-Platform/
├── backend/                  # FastAPI Application & AI Logic
│   ├── app/
│   │   ├── api/              # API Endpoints (Resume, ML, Interview, RAG, WebSockets)
│   │   ├── core/             # Security (JWT) & Configurations
│   │   ├── db/               # SQLAlchemy Models & Database Sessions
│   │   ├── ml/               # Machine Learning Prediction Pipelines
│   │   └── services/         # Business Logic (Langchain, Parsing)
│   ├── tests/                # Pytest suites
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/                 # Next.js Application
│   ├── src/
│   │   ├── app/              # App Router (Dashboard, Landing, Auth, Labs)
│   │   ├── components/       # Shared UI components and Widgets
│   │   └── lib/              # Utility functions
│   └── Dockerfile
├── docker-compose.yml        # Infrastructure config (PostgreSQL, Redis)
└── README.md
```

---

## 🛠️ Installation & Quick Start

### 1. Start Infrastructure (Database & Cache)
Ensure Docker is installed and running, then spin up the required databases:
```bash
docker compose up -d
```
*This starts PostgreSQL on port `5432` and Redis on `6379`.*

### 2. Run the Backend API
Navigate to the backend, set up a virtual environment, and start FastAPI:
```bash
cd backend
python -m venv venv

# Activate venv:
source venv/bin/activate      # On macOS/Linux
venv\Scripts\activate         # On Windows

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
📚 **API Documentation**: Available instantly at `http://localhost:8000/docs`

### 3. Run the Frontend
Navigate to the frontend, install Node packages, and start Next.js:
```bash
cd frontend
npm install
npm run dev
```
🌐 **Web App**: Accessible at `http://localhost:3000`

---

## 🔮 Future Roadmap
- [ ] Integration with external Job APIs (TheirStack, USAJobs).
- [ ] Direct webRTC voice pipelines for the Behavioral Lab.
- [ ] Full WASM/WebContainers integration for live CodeSandbox execution in the browser.
- [ ] Fine-tuned open-source LLMs (Llama 3) for cost-effective, private local processing.

## 📄 License
This project is proprietary and built for demonstration and portfolio purposes.
