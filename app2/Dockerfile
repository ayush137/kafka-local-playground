FROM node:16.9.0-alpine
WORKDIR /app2
COPY package.json index.js /app2/
RUN npm install
RUN npm i -g nodemon
CMD ["nodemon", "index.js"]