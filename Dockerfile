FROM node:6

WORKDIR /app

ADD . /app

RUN npm install

EXPOSE 8888

CMD ["npm", "test"]

