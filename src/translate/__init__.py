from fastapi import FastAPI
from pydantic import BaseModel
from . import model

class TranslateRequest(BaseModel):
    to: str
    text: str

app = FastAPI()

@app.post('/')
def translate(req: TranslateRequest):
    return model.translate(req.to, req.text)

@app.get('/health')
def healthcheck():
    return 'ok'