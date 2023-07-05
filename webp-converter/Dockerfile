FROM debian:buster
RUN apt-get update && apt-get install -y webp
WORKDIR /app
COPY code /app

RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_20.x  | bash -
RUN apt-get -y install nodejs

EXPOSE 3000

#ENTRYPOINT ["/bin/bash"]

WORKDIR /app/express

RUN npm install

CMD ["npm", "start"]
