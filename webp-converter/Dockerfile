FROM debian:buster
RUN apt-get update && \
 apt-get install -y webp && \
 apt-get install -y imagemagick
WORKDIR /code
COPY code /code

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs

EXPOSE 3000

WORKDIR /code/express

RUN npm install

WORKDIR /code

CMD ["./npm-start.sh"]
