var exec = require("child_process").exec;

exec("npm i --no-warnings", function (err, out, stderr) {
  const cmd = require("node-cmd");

  console.log("Iniciando Unicred Mobile Tooling...");

  cmd.runSync("cd app && npm i --no-warnings");

  cmd.runSync("cd app && pm2 restart 'tooling-app'");

  console.log("Iniciando Unicred Mobile Tooling...");
});
