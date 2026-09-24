# type: ignore
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserLogin, UserResponse, UserCreate
from app.models.revoked_token import RevokedToken
from app.core.dependencies import get_current_user, oauth2_scheme
from app.core.security import (verify_password,
                               create_access_token, hash_password)

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login")
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_login.email).first()
    if not user:
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    if not verify_password(user_login.password, user.password):  # type: ignore
        raise HTTPException(
            status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
        data={
            "sub": str(user.id)
        })

    return {"access_token": access_token,
            "type": "bearer"}


@router.post("/logout", status_code=204)
def logout(current_user: User = Depends(get_current_user),
           token: str = Depends(oauth2_scheme),
           db: Session = Depends(get_db)):
    revoked_token = RevokedToken(token=token)

    db.add(revoked_token)
    db.commit()


@router.post("/register", status_code=201)
def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
        User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        name=user_data.name,
        email=user_data.email,
        password=hash_password(user_data.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": "User created."}


@router.get("/me", response_model=UserResponse)
def read_current_user(current_user: User = Depends(get_current_user)):
    if not current_user:
        raise HTTPException
    return current_user
