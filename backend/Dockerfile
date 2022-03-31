FROM python:3.10.4-alpine

WORKDIR /app/backend

COPY . .

RUN apk add -u zlib-dev jpeg-dev gcc musl-dev \
 && pip install --upgrade pip setuptools && pip install -r requirements.txt