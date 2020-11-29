#!/bin/bash

npm init -y 
npm i --save concurrently

cd app && npm i
cd .. && cd server && npm i
cd .. && cd server && touch :tooling_db 
cd .. && cd server && npx sequelize-cli db:migrate

cd .. && npm start