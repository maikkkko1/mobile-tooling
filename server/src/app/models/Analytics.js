const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Analytics = sequelize.define(
    "analytics",
    {
      eventKey: DataTypes.STRING,
      eventValue: DataTypes.TEXT,
    },
    { freezeTableName: true }
  );

  Analytics.beforeCreate((v) => (v.id = uuidv4()));

  return Analytics;
};
