FROM node:10
MAINTAINER Justin Firth <jmfirth@gmail.com>

RUN npm install -g yarn
RUN npm install nodemon -g

VOLUME /app

EXPOSE 8080

WORKDIR /app

CMD ["npm", "run", "start"]