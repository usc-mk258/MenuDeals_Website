FROM node:12.16.3-alpine3.9
WORKDIR /usr/app

COPY package.json .
RUN npm install --quiet

COPY . .