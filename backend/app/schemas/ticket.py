from enum import Enum
from pydantic import BaseModel, Field
from typing import Optional


class TicketArea(str, Enum):
    HARDWARE = "hardware"
    SOFTWARE = "software"
    NETWORK = "network"
    ACCESS = "access"
    EMAIL = "email"
    SECURITY = "security"
    OTHER = "other"


class TicketPriority(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class TicketStatus(str, Enum):
    OPEN = "open"
    IN_PROGRESS = "in_progress"
    CLOSED = "closed"


class TicketCreate(BaseModel):
    title: str = Field(min_length=4, max_length=100)
    description: str = Field(min_length=5)
    area: TicketArea
    priority: TicketPriority = TicketPriority.LOW


class TicketResponse(BaseModel):
    id: int
    title: str
    description: str
    area: TicketArea
    status: TicketStatus
    priority: TicketPriority
    created_by: int
    assigned_to: Optional[int]
