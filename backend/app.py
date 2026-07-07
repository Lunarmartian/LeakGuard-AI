from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from scanner import scan_text
from risk_engine import calculate_risk
from breach_lookup import check_email_breaches, BreachLookupError

app = FastAPI(
    title="LeakGuard AI",
    description="Cybersecurity detection & risk analysis API. "
                 "Try requests live in the interactive docs below.",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "project": "LeakGuard AI",
        "status": "running",
        "docs": "/docs",
        "redoc": "/redoc"
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

@app.post("/breach-check")
def breach_check(data: dict):

    email = data.get("email", "").strip()

    if not email:
        raise HTTPException(status_code=400, detail="email is required")

    try:
        breaches = check_email_breaches(email)
    except BreachLookupError as exc:
        raise HTTPException(status_code=exc.status_code, detail=str(exc))

    return {
        "email": email,
        "breached": len(breaches) > 0,
        "breaches": breaches
    }
