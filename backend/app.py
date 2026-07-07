from fastapi import FastAPI
from scanner import scan_text
from risk_engine import calculate_risk

app = FastAPI(
    title="LeakGuard AI",
    version="0.1.0"
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
