var exec = require("child_process").exec;

exec("npm i --no-warnings", function (err, out, stderr) {
  const cmd = require("node-cmd");

  console.log("########### Iniciando Unicred Mobile Tooling... ###########");

  cmd.runSync("cd app && npm i --no-warnings && npm i --save-dev sass");
  cmd.runSync("cd server && npm i --no-warnings && npm i sqlite3 --save");

  cmd.runSync("cd server && npx sequelize-cli db:migrate");

  cmd.runSync("npm start");

  console.log("########### Unicred Mobile Tooling Inicializado! ###########");
});
