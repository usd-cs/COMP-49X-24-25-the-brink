FROM node:18-alpine
WORKDIR /the-brink

COPY public/ /the-brink/public
COPY src/ /the-brink/src
COPY package.json /the-brink/
COPY package-lock.json /the-brink/

RUN npm install
RUN npm start

EXPOSE 3000

CMD ["npm", "start"]