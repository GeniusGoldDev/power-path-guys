from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Food(Base):
    __tablename__ = 'foods'
    
    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)  # Ensure food name is unique
    calories = Column(Float, nullable=False)

class FoodRecord(Base):
    __tablename__ = 'food_records'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    food_id = Column(Integer, ForeignKey('foods.id'), nullable=False)
    date = Column(DateTime, default=datetime.utcnow)  # Record the date when the food is consumed

    # Relationships
    user = relationship('Users', back_populates='food_records')  # Correct back_populates key
    food = relationship('Food')

# Update the User model to include relationship with FoodRecord
class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    username = Column(String, unique=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)

    food_records = relationship('FoodRecord', back_populates='user')  # Correct back_populates key
