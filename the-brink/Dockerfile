FROM node:18-alpine

WORKDIR /the-brink/

COPY public/ /the-brink/public
COPY src/ /the-brink/src
COPY package.json /the-brink/
COPY server.js /the-brink/     

RUN npm install

EXPOSE 3000
EXPOSE 5432

CMD ["npm", "start"]
