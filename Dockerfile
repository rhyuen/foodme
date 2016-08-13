FROM node:argon
MAINTAINER rhyuen
WORKDIR /home/app/code
COPY . /home/app/code/
ENV NODE_ENV development
RUN npm cache clean &&\
    npm install --silent --progress=false &&\
    apt-get clean
