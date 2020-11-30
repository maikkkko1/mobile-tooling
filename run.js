var exec = require("child_process").exec;

exec("npm i --no-warnings", function (err, out, stderr) {
  const cmd = require("node-cmd");

  const isWin = process.platform === "win32";

  console.log("Iniciando Unicred Mobile Tooling...");

  cmd.runSync("cd app && npm i --no-warnings");
  cmd.runSync("cd server && npm i --no-warnings");

  if (!isWin) {
    cmd.runSync("cd server && touch :tooling_db ");
  } else {
    cmd.runSync("cd server && type NUL > :tooling_db ");
  }

  cmd.runSync("cd server && npx sequelize-cli db:migrate");

  cmd.runSync(
    "pm2 kill && cd server && pm2 start npm --name 'tooling-server' -- start"
  );

  cmd.runSync(
    "cd app && pm2 start npm --name 'tooling-app' -- start --no-autorestart"
  );

  console.log("Iniciando Unicred Mobile Tooling...");
});
