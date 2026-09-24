from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone

from app.database.database import Base  # type: ignore


class RevokedToken(Base):
    __tablename__ = "revoked_tokens"

    id = Column(Integer, primary_key=True, index=True)

    token = Column(String, unique=True, nullable=False, index=True)

    revoked_at = Column(
        DateTime,
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
