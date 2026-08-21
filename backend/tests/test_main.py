import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_login_success():
    response = client.post("/login", json={"username": "admin", "password": "admin123"})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 300


def test_login_wrong_password():
    response = client.post("/login", json={"username": "admin", "password": "wrong"})
    assert response.status_code == 401


def test_login_wrong_user():
    response = client.post("/login", json={"username": "unknown", "password": "admin123"})
    assert response.status_code == 401


def test_refresh_success():
    login_response = client.post("/login", json={"username": "admin", "password": "admin123"})
    token = login_response.json()["access_token"]
    response = client.post("/refresh", json={"token": token})
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["expires_in"] == 300


def test_refresh_invalid_token():
    response = client.post("/refresh", json={"token": "invalidtoken"})
    assert response.status_code == 401
