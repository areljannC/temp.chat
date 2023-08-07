FROM node:lts-alpine3.16

WORKDIR /usr/src/client

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9091

CMD ["npm", "run", "dev"]