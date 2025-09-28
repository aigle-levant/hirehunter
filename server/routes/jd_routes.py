from fastapi import APIRouter
from pydantic import BaseModel
from services.integrate_grok import model
from langchain.chat_models import init_chat_model
from langchain.prompts import PromptTemplate

router = APIRouter()

class JobDescription(BaseModel):
    text: str

@router.post("/parse-jd")
def parse_jd(jd: JobDescription):
    prompt = PromptTemplate(
        input_variables=["text"],
        template="Extract key skills and seniority level from this job description:\n{text}"
    )

    pipeline = prompt | model
    result = pipeline.invoke({"text": jd.text})
    return {"parsed": result}