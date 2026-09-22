from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    ALLOWED_ORIGINS: list[str] = Field(default_factory=lambda: ["*"])

    class Config:
        env_file = ".env",
        extra = "ignore"


settings = Settings()  # type: ignore

print("ALLOWED_ORIGINS =", settings.ALLOWED_ORIGINS)

engine = create_engine(settings.DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
