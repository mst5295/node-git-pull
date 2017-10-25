FROM node:latest

ENV DEBIAN_FRONTEND noninteractive
RUN apt-get update && apt-get install -y netcat
RUN apt-get update && apt-get install git-all -y netcat

COPY package.json /usr/src/app/
WORKDIR /usr/src/app

RUN npm install -g jasmine
RUN npm install

RUN git config --global core.sshCommand "ssh -FV /usr/src/app/spec/test_environment/assists/config"

COPY . /usr/src/app/

#ENV GIT_SSH_COMMAND = "ssh -FVV /usr/src/app/spec/test_environment/assists/config"

CMD cd /usr/src/app/ && npm test