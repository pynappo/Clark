
FROM node:alpine

WORKDIR /app

COPY package.json ./

RUN npm install --production

COPY ./desserts_api /app/desserts_api

EXPOSE 8084

ARG GENERAL_API_URL

ARG DATABASE_HOST

ARG NODE_ENV

ARG VERIFICATION_BASE_URL

CMD [ "node", "./dessert_api/server.js" ]
