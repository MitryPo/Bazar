FROM python:3.8 as django
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONNUNBUFFERED 1

WORKDIR /app
RUN apt-get update \
    && apt-get install netcat -y
RUN apt-get upgrade -y
COPY requirements.txt .
RUN pip install -r requirements.txt
ENTRYPOINT [ "python", "./manage.py" ]

FROM node:12 as node
COPY frontend/package.json /app/
WORKDIR /app
RUN npm install
RUN npm install -g react-cli react

COPY . .