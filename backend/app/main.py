from fastapi import FastAPI

from .routers import router

app = FastAPI(title="hodocomm API", version="0.1.0")

app.include_router(router)


@app.get("/healthz")
async def health_check():
    return {"status": "ok"}
