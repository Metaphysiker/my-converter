FROM debian:buster
RUN apt-get update && \
 apt-get install -y webp && \
 apt-get install -y imagemagick
WORKDIR /app
COPY code /app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs

EXPOSE 3000

WORKDIR /app/express

RUN npm install

WORKDIR /app

CMD ["./npm-start.sh"]
