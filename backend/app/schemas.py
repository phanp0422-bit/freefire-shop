from pydantic import BaseModel


class AccountCreate(BaseModel):

    title: str

    price: int

    level: int

    diamonds: int

    skins: int

    image: str

class UserCreate(BaseModel):

    username: str

    password: str

class OrderCreate(BaseModel):

    account_id: int

    buyer_username: str
