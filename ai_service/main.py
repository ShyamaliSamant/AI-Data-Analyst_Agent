from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd

app = FastAPI()

class QueryRequest(BaseModel):
    question: str

@app.get("/")
def home():
    return {"message": "AI Data Analyst Service Running 🚀"}

@app.post("/analyze")
def analyze_data(request: QueryRequest):
    question = request.question
    
    # Dummy AI logic (we will upgrade later)
    if "sales" in question.lower():
        return {"answer": "Total sales are increasing 📈"}
    
    return {"answer": "I am analyzing your data..."}
