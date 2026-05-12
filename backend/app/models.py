from sqlalchemy import Column, Integer, String

from .database import Base

class GameAccount(Base):
    __tablename__ = "game_accounts"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)

    price = Column(Integer)

    level = Column(Integer)

    diamonds = Column(Integer)

    skins = Column(Integer)

    image = Column(String)

    username = Column(String)

    password = Column(String)

    status = Column(String, default="available")

class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True)

    password = Column(String)

    role = Column(String, default="user")

class Order(Base):

    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)

    account_id = Column(Integer)

    buyer_username = Column(String)

    status = Column(String, default="pending")

    payment_method = Column(String, default="banking")