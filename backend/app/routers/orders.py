from fastapi import APIRouter

from sqlalchemy.orm import Session

from fastapi import Depends

from ..database import get_db

from ..models import Order
from ..models import GameAccount

from ..schemas import OrderCreate

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.post("/")
def create_order(
    order: OrderCreate,
    db: Session = Depends(get_db)
):

    account = db.query(GameAccount).filter(
        GameAccount.id == order.account_id
    ).first()

    if not account:

        return {
            "error": "Account not found"
        }

    if account.status == "sold":

        return {
            "error": "Account already sold"
        }

    new_order = Order(

        account_id=order.account_id,

        buyer_username=order.buyer_username
    )

    db.add(new_order)

    account.status = "sold"

    db.commit()

    db.refresh(new_order)

    return {
        "message": "Order created"
    }

@router.put("/{order_id}/paid")
def mark_paid(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:

        return {
            "error": "Order not found"
        }

    order.status = "paid"

    db.commit()

    return {
        "message": "Order paid"
    }