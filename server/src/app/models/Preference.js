const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  const Preference = sequelize.define(
    "preference",
    {
      parentKey: DataTypes.STRING,
      keyName: DataTypes.STRING,
      keyValue: DataTypes.TEXT,
    },
    { freezeTableName: true }
  );

  Preference.beforeCreate((v) => (v.id = uuidv4()));

  return Preference;
};
