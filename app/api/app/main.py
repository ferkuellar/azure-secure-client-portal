from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.data import PROFILE, INCIDENTS, SERVICES

app = FastAPI(
    title="Azure Secure Client Portal API",
    version="1.0.0",
    description="Backend API for Azure Secure Client Portal, providing user profile, incident management, and service status information."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://lively-smoke-0f8472e0f.7.azurestaticapps.net"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {
        "status"    : "ok",
        "service"   : "azure-secure-client-portal-api",
        "version"   : "1.0.0"
    }

@app.get("/api/profile")
def get_profile():
    return PROFILE

@app.get("/api/incidents")
def get_incidents():
    return INCIDENTS

@app.get("/api/services/status")
def get_services_status():
    return SERVICES