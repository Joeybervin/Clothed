FROM node:lts-alpine

RUN mkdir /app
WORKDIR /app

COPY ./package*.json .
RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm",  "start"]