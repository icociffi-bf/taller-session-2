from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

from app.auth import (
    ACCESS_TOKEN_EXPIRE_SECONDS,
    authenticate_user,
    create_access_token,
    decode_token,
)
from jose import JWTError

app = FastAPI(title="JWT Auth Service", version="0.1.0")


class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    token: str


@app.post("/login")
def login(request: LoginRequest):
    user = authenticate_user(request.username, request.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    token = create_access_token({"sub": user["username"]})
    return {"access_token": token, "token_type": "bearer", "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS}


@app.post("/refresh")
def refresh(request: RefreshRequest):
    try:
        payload = decode_token(request.token)
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    new_token = create_access_token({"sub": username})
    return {"access_token": new_token, "token_type": "bearer", "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS}
