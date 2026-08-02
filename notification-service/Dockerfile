FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY notification-service ./notification-service

WORKDIR /project/notification-service

RUN npm install

EXPOSE 5006

CMD ["npm","start"]
