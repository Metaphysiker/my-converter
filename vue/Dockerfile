FROM node:20-alpine

WORKDIR /vue

COPY . /vue

WORKDIR /vue/vue-app

RUN npm install

EXPOSE "8080"

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0" ]
