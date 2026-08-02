FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY gateway-service ./gateway-service

WORKDIR /project/gateway-service

RUN npm install

EXPOSE 5000

CMD ["npm","start"]
