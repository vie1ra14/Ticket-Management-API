# type: ignore
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from typing import List
from app.database.database import get_db
from app.core.dependencies import require_admin
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.core.security import hash_password

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("", response_model=List[UserResponse])
def list_users(current_user: User = Depends(require_admin),
               db: Session = Depends(get_db)):

    user_list = db.query(User).all()
    return user_list


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int, current_user: User = Depends(require_admin),
             db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_data: UserUpdate,
                current_user: User = Depends(require_admin),
                db: Session = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user_data.name is not None:
        user.name = user_data.name

    if user_data.email is not None:
        user.email = user_data.email

    if user_data.password is not None:
        user.password = hash_password(user_data.password)

    if user_data.role is not None:
        user.role = user_data.role.value

    db.commit()
    db.refresh(user)
    return user


@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: int, db: Session = Depends(get_db),
                current_user: User = Depends(require_admin)):
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if user.id == current_user.id:
        raise HTTPException(
            status_code=400,
            detail="You cant delete your own account."
        )

    db.delete(user)
    db.commit()
