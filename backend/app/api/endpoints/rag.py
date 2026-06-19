from fastapi import APIRouter
from app.services.rag import generate_rag_response, index_document

router = APIRouter()

@router.post("/ask")
async def ask_knowledge_base(query: str, collection: str = "interview_prep"):
    """
    Query the RAG knowledge system for career and interview guidance.
    """
    response = generate_rag_response(query, collection)
    return {"answer": response}

@router.post("/index")
async def index_content(doc_id: str, text: str, collection: str = "interview_prep"):
    """
    Admin endpoint to index new materials into the knowledge base.
    """
    index_document(collection, doc_id, text)
    return {"status": "success", "indexed_id": doc_id}
