FROM node:14

WORKDIR /todo-api-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start
