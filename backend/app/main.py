from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from .models import Base

from .routers import accounts

from .routers import auth

from .routers import orders

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

app.include_router(accounts.router)
app.include_router(auth.router)
app.include_router(orders.router)
app.include_router(auth.router)
app.include_router(orders.router)

@app.get("/")
def home():
    return {"message": "Free Fire backend running"}