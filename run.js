var exec = require("child_process").exec;

exec("npm i --no-warnings", function (err, out, stderr) {
  const cmd = require("node-cmd");

  console.log("Iniciando Unicred Mobile Tooling...");

  cmd.runSync("npm i -g pm2");

  cmd.runSync("cd app && npm i --no-warnings");
  cmd.runSync("cd server && npm i --no-warnings");

  cmd.runSync("cd server && npx sequelize-cli db:migrate");

  cmd.runSync(
    "pm2 kill && cd server && pm2 start npm --name 'tooling-server' -- start"
  );

  cmd.runSync(
    "cd app && pm2 start npm --name 'tooling-app' -- start --no-autorestart"
  );

  console.log("Iniciando Unicred Mobile Tooling...");
});
