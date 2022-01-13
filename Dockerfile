FROM tiangolo/uvicorn-gunicorn-fastapi:python3.9-slim

ADD ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

COPY . /app
