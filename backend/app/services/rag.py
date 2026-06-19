import chromadb
from chromadb.config import Settings
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
import os

# Initialize local ChromaDB client
chroma_client = chromadb.Client(Settings(is_persistent=True, persist_directory="./chroma_db"))

def get_or_create_collection(name: str):
    return chroma_client.get_or_create_collection(name=name)

def index_document(collection_name: str, doc_id: str, text: str, metadata: dict = None):
    """
    Indexes a document into the specified collection.
    Chroma uses a default sentence-transformer embedding model automatically.
    """
    collection = get_or_create_collection(collection_name)
    collection.add(
        documents=[text],
        metadatas=[metadata] if metadata else [{}],
        ids=[doc_id]
    )

def search_knowledge_base(collection_name: str, query: str, n_results: int = 3):
    """
    Retrieves the most relevant documents for a given query.
    """
    collection = get_or_create_collection(collection_name)
    results = collection.query(
        query_texts=[query],
        n_results=n_results
    )
    return results['documents'][0] if results['documents'] else []

def generate_rag_response(query: str, collection_name: str = "interview_prep") -> str:
    """
    Uses retrieved context to answer a user query via LLM.
    """
    if os.environ.get("OPENAI_API_KEY") == "dummy-key-for-now":
        return "This is a mocked RAG response since no real OpenAI key is provided. You asked: " + query
        
    try:
        # 1. Retrieve context
        context_docs = search_knowledge_base(collection_name, query)
        context = "\n\n".join(context_docs)
        
        # 2. Generate
        llm = ChatOpenAI(temperature=0.5, model_name="gpt-3.5-turbo")
        prompt = ChatPromptTemplate.from_template(
            "You are an expert career coach. Answer the user's question based ONLY on the following context:\n\n{context}\n\nQuestion: {query}"
        )
        
        chain = prompt | llm | StrOutputParser()
        return chain.invoke({"context": context, "query": query})
    except Exception as e:
        print(f"RAG Error: {e}")
        return "I encountered an error trying to generate a response."
