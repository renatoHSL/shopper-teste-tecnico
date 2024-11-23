FROM node:18-alpine

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

USER node

CMD [ "node", "app.js" ]

