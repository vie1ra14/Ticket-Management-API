# type: ignore
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware


from app.database.database import Base, engine, settings
from app.api.routes.auth import router as auth_router
from app.api.routes.users import router as users_router
from app.models.user import User

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sistema de Gerenciamento de Chamados",
    description="API para gerenciamento de chamados de suporte técnico.",
    version="1.0.0",
)

app. add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth_router)
api_router.include_router(users_router)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "Bem-vindo ao Sistema de Gerenciamento de Chamados!"}
