from fastapi import FastAPI

from app.database.database import Base, engine
from app.api.routes.register import router as register_router
from app.api.routes.login import router as login_router
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gerenciamento de Chamados",
    description="API para gerenciamento de chamados de suporte técnico.",
    version="1.0.0",
)

app.include_router(register_router)
app.include_router(login_router)


@app.get("/")
def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Chamados!"}
