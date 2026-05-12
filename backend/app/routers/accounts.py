from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends
from ..schemas import AccountCreate
from ..database import get_db
from ..models import GameAccount

from fastapi import APIRouter

router = APIRouter(
    prefix="/accounts",
    tags=["Accounts"]
)

@router.post("/")
def create_account(
    account: AccountCreate,
    db: Session = Depends(get_db)
):

    new_account = GameAccount(

        title=account.title,

        price=account.price,

        level=account.level,

        diamonds=account.diamonds,

        skins=account.skins,

        image=account.image,

        username="testuser",

        password="123456"
    )

    db.add(new_account)

    db.commit()

    db.refresh(new_account)

    return new_account

@router.get("/")
def get_accounts(db: Session = Depends(get_db)):

    accounts = db.query(GameAccount).all()

    return accounts

@router.delete("/{account_id}")
def delete_account(
    account_id: int,
    db: Session = Depends(get_db)
):

    account = db.query(GameAccount).filter(
        GameAccount.id == account_id
    ).first()

    if not account:
        return {"error": "Account not found"}

    db.delete(account)

    db.commit()

    return {"message": "Deleted"}

@router.put("/{account_id}")
def update_account(
    account_id: int,
    db: Session = Depends(get_db)
):

    account = db.query(GameAccount).filter(
        GameAccount.id == account_id
    ).first()

    if not account:
        return {"error": "Not found"}

    account.price = 999999

    db.commit()

    return account