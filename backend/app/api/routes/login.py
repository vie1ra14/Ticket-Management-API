from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserLogin
from app.core.security import verify_password, create_access_token

router = APIRouter(prefix="/login", tags=["login"])


@router.post("")
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_login.email).first()
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    if not verify_password(user_login.password, user.password):  # type: ignore
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    acess_token = create_access_token(
        {"sub": str(user.id), "role": user.role})  # type: ignore

    return {"acess_token": acess_token,
            "token_type": "bearer"}
