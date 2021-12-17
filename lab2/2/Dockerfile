FROM node

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE 8005

CMD [ "node", "service2.js" ]
