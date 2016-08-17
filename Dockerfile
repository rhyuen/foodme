FROM node:argon
MAINTAINER rhyuen

#ADD NON-ROOT USER so not ADMIN by DEFAULT
RUN useradd --user-group --create-home --shell /bin/false nonrootuser
USER nonrootuser

WORKDIR /home/app/code

#MOVE PACKAGE.JSON and CODE in SEPARATE STEPS to take advantage of DOCKER CACHING
COPY package.json /home/app/code/
#Files moved to the container with COPY are ROOT only for R/W inside container.
#USE chown to nonrootuser so that it can read it.
RUN chown -R nonrootuser:nonrootuser /home/app/code

ENV NODE_ENV development
RUN npm install --silent --progress=false &&\
    #REMOVES tars used from NPM INSTALL
    npm cache clean &&\
    apt-get clean
EXPOSE 9098
CMD ["npm", "start"]
