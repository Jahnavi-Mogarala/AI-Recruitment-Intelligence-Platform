import io
from PyPDF2 import PdfReader
from docx import Document
from typing import Optional

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extracts text from a PDF file byte stream."""
    try:
        reader = PdfReader(io.BytesIO(file_content))
        text = ""
        for page in reader.pages:
            if page.extract_text():
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        print(f"Error extracting PDF: {e}")
        return ""

def extract_text_from_docx(file_content: bytes) -> str:
    """Extracts text from a DOCX file byte stream."""
    try:
        doc = Document(io.BytesIO(file_content))
        return "\n".join([para.text for para in doc.paragraphs])
    except Exception as e:
        print(f"Error extracting DOCX: {e}")
        return ""

def parse_resume(file_content: bytes, filename: str) -> Optional[str]:
    """Routes the parsing based on file extension."""
    if filename.lower().endswith('.pdf'):
        return extract_text_from_pdf(file_content)
    elif filename.lower().endswith('.docx'):
        return extract_text_from_docx(file_content)
    else:
        # Assuming plain text if not pdf or docx
        return file_content.decode('utf-8', errors='ignore')
