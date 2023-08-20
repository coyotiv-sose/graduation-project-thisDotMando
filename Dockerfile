FROM node:alpine

WORKDIR /app

COPY . .

ADD package.json package-lock.json ./

RUN npm install -g nodemon

ADD bin ./bin

CMD ["npm", "run", "start"]
