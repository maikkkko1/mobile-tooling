#!/bin/bash
echo "########### Iniciando Unicred Mobile Tooling... ###########"

npm i --no-warnings

cd app && npm i --no-warnings && npm i --save-dev sass
cd .. && cd server && npm i --no-warnings && npm i sqlite3 --save && npx sequelize-cli db:migrate
cd .. && npm start

