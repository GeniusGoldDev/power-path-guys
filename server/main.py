from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import SessionLocal, engine
from typing import Annotated, List, Dict
from routers import diet, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/healthy")
def health_check():
    return {'status': 'Healthy'}

# app.include_router(diet.router)
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(diet.router, prefix="/diet", tags=["Diet"])
