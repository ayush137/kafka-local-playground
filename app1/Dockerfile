FROM node:16.9.0-alpine
WORKDIR /app1
COPY package.json index.js /app1/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]