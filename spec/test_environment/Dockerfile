FROM node:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y netcat

COPY package.json /usr/src/app
WORKDIR /usr/src/app

COPY C:\Users\Meike\.ssh\id_rsa /usr/src/app
COPY C:\Users\Meike\.ssh\id_rsa.pub /usr/src/app
COPY C:\Users\Meike\.ssh\config /usr/src/app

ENV GIT_SSH = "ssh -F /usr/src/app"

CMD npm test