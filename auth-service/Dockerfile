FROM node:20-alpine

WORKDIR /project

COPY credentials ./credentials
COPY auth-service ./auth-service

WORKDIR /project/auth-service

RUN npm install

EXPOSE 5001

CMD ["npm","start"]
