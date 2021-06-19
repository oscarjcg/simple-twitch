FROM node:latest as node

WORKDIR /usr/src/simple-twitch

RUN npm install -g @angular/cli @angular-devkit/build-angular

EXPOSE 4201