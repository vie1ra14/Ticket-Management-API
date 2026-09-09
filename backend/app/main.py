from fastapi import FastAPI

from app.database.database import Base, engine
from app.api.routes.users import router as users_router
from app.api.routes.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gerenciamento de Chamados",
    description="API para gerenciamento de chamados de suporte técnico.",
    version="1.0.0",
)

app.include_router(users_router)
app.include_router(auth_router)


@app.get("/")
def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Chamados!"}
