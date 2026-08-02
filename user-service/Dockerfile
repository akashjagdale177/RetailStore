FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY user-service ./user-service

WORKDIR /project/user-service

RUN npm install

EXPOSE 5005

CMD ["npm","start"]
