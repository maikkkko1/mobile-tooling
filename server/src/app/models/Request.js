const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "request",
    {
      url: DataTypes.STRING,
      body: DataTypes.STRING,
      response: DataTypes.STRING,
      method: DataTypes.STRING,
      device: DataTypes.STRING,
      httpCode: DataTypes.INTEGER,
    },
    { freezeTableName: true }
  );

  Request.beforeCreate((v) => (v.id = uuidv4()));

  return Request;
};
