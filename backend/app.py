from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scanner import scan_text
from risk_engine import calculate_risk

app = FastAPI(
    title="LeakGuard AI",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "project": "LeakGuard AI",
        "status": "running"
    }

@app.post("/scan")
def scan(data: dict):

    text = data.get("text", "")

    findings = scan_text(text)

    risk = calculate_risk(findings)

    return {
        "findings": findings,
        "risk": risk
    }
