docker-compose build
docker-compuse up -d
docker-compose run vue_develop // issues with path and ownership
docker exec -it 6e2fbcd73478 sh // using this works to install
npm commands:
docker-compose run npm sh
