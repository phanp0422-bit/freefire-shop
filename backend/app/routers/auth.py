from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from passlib.context import CryptContext

from ..database import get_db
from ..models import User
from ..schemas import UserCreate

from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

pwd_context = CryptContext(
    schemes=["pbkdf2_sha256"],
    deprecated="auto"
)

@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    hashed_password = pwd_context.hash(
        user.password
    )

    new_user = User(
        username=user.username,
        password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User created"
    }

SECRET_KEY = "mysecretkey"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60

@router.post("/login")
def login(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if not db_user:

        return {
            "error": "Invalid username"
        }

    valid_password = pwd_context.verify(
        user.password,
        db_user.password
    )

    if not valid_password:

        return {
            "error": "Invalid password"
        }

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    payload = {
        "sub": db_user.username,
        "role": db_user.role,
        "exp": expire
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }