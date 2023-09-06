FROM node:alpine

RUN npm install -g nodemon

WORKDIR /app

# COPY . .

ADD package.json package-lock.json ./

#run npm install
RUN npm install

ADD bin ./bin
ADD src ./src

CMD ["npm", "run", "dev"]
