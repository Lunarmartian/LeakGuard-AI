from fastapi import FastAPI

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

@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
