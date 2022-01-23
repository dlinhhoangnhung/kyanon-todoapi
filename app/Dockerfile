FROM node:14

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
# RUN apk add --no-cache bash
CMD npm start