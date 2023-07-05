FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

COPY example-images/waterfall.jpg images/waterfall.jpg

CMD ["npm", "start"]
