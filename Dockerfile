FROM node:latest

WORKDIR /app

RUN npm install

RUN nodemon


EXPOSE 5000