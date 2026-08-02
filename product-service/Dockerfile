FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY product-service ./product-service

WORKDIR /project/product-service

RUN npm install

EXPOSE 5002

CMD ["npm","start"]
