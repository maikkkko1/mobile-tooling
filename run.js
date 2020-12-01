var exec = require("child_process").exec;

console.log("########### Iniciando Unicred Mobile Tooling... ###########");

exec("npm start", function (err, out, stderr) {
  console.log("########### Unicred Mobile Tooling Inicializado! ###########");
});
