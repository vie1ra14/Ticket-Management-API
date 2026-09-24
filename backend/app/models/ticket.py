# type: ignore
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database.database import Base


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)

    area = Column(String(30), nullable=False)

    status = Column(String(30), nullable=False, default="open")
    priority = Column(String(30), nullable=False, default="low")

    created_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    assigned_to = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )
