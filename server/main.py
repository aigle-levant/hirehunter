from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.jd_routes import router as jd_parser_router

app = FastAPI(title="Hirehunter")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:8000"], allow_methods=["*"], allow_headers=["*"])

app.include_router(jd_parser_router, prefix="/jobs", tags=["JD Parser"])

@app.get("/")
async def root():
    return {"status": "Backend ready"}