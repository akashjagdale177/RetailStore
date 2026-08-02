FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY order-service ./order-service

WORKDIR /project/order-service

RUN npm install

EXPOSE 5004

CMD ["npm","start"]
