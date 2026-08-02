FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY cart-service ./cart-service

WORKDIR /project/cart-service

RUN npm install

EXPOSE 5003

CMD ["npm","start"]
