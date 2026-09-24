# type: ignore
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.database import get_db
from app.models.ticket import Ticket
from app.schemas.ticket import TicketCreate, TicketResponse
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/tickets",
    tags=["Tickets"]
)


@router.get("", response_model=List[TicketResponse])
def list_ticket(db: Session = Depends(get_db),
                current_user: User = Depends(get_current_user),
                ticket=Ticket):

    tickets = db.query(Ticket).all()

    if current_user.role == 'user':
        tickets = db.query(Ticket).filter(
            Ticket.created_by == current_user.id).all()

    return tickets


@router.post("", response_model=TicketResponse, status_code=201)
def create_ticket(
    ticket_data: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    if current_user.role != 'user':
        raise HTTPException(
            status_code=401, detail="Only users can create ticket.")

    ticket = Ticket(
        title=ticket_data.title,
        description=ticket_data.description,
        area=ticket_data.area.value,
        priority=ticket_data.priority,
        created_by=current_user.id
    )

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket
