FROM node:20-alpine

#WORKDIR /vue

#COPY . /vue

WORKDIR /vue/vue-app
COPY /vue-app /vue/vue-app

RUN npm install -g @vue/cli

RUN npm install

EXPOSE "8080"

CMD ["npm", "run", "serve", "--", "--host", "0.0.0.0" ]
