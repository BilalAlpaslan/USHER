FROM python:3.9.0-alpine

ADD requirements.txt /app/requirements.txt

RUN pip install -r app/requirements.txt

ADD . /app/

EXPOSE 80
CMD gunicorn app.main:app --log-level info --workers 1 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:80