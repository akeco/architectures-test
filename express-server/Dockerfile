FROM node:alpine
WORKDIR /app

ADD server.js /app
ADD package.json /app
ADD server /app
ADD src /app
ADD .env /app

EXPOSE 7000
RUN npm install
CMD [ "node", "server.js" ]
