FROM node:lts-alpine

RUN npm install --global nodemon

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm",  "start"]