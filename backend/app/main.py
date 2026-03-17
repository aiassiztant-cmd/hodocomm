from fastapi import FastAPI

app = FastAPI(title="hodocomm API", version="0.1.0")


@app.get("/healthz")
async def health_check():
    return {"status": "ok"}
