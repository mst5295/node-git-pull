FROM node:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y netcat

COPY package.json /usr/src/app
WORKDIR /usr/src/app

COPY ./assists/id_rsa /usr/src/app
COPY ./assists/id_rsa.pub /usr/src/app
COPY ./assists/config /usr/src/app

RUN npm install https://github.com/mst5295/node-git-pull --save-dev
RUN npm install

ENV GIT_SSH = "ssh -F /usr/src/app"

CMD npm test