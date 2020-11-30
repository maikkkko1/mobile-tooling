npm i --no-warnings --quiet --silent

cd app && npm i --no-warnings --quiet --silent
cd .. && cd server && npm i --no-warnings --quiet --silent
cd .. && cd server && touch :tooling_db 
cd .. && cd server && npx sequelize-cli db:migrate

cd .. && pm2 kill && cd server && pm2 start npm --name "tooling-server" -- start
cd .. && cd app && pm2 start npm --name "tooling-app" -- start --no-autorestart

echo "Iniciando Unicred Mobile Tooling..."