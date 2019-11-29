FROM node:latest

WORKDIR /app

COPY ./package.json /app/

RUN npm install

RUN nodemon


EXPOSE 5000