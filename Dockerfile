FROM python:3.9.0-slim

ADD ./requirements.txt /app/requirements.txt

RUN pip install -r requirements.txt

ADD ./main.py /main.py

CMD uvicorn main:app --port 80 --workers 1

