#!/bin/bash

npm i --no-warnings --quiet --silent

cd app && npm i --no-warnings --quiet --silent

cd .. && cd app && pm2 restart "tooling-app" 

echo "Iniciando Unicred Mobile Tooling..."