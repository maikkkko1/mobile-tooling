require("dotenv").config({
  path: process.env.NODE_ENV == "test" ? ".env.test" : ".env",
});

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "sqlite",
  logging: false,
  storage: "tooling_db.sqlite3",
};
