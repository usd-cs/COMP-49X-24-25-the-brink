FROM node:18-alpine
WORKDIR /the-brink/

COPY public/ /the-brink/public
COPY src/ /the-brink/src
COPY package.json /the-brink/

RUN npm install

EXPOSE 8089

CMD ["npm", "start"]