("use strict");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("request", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      body: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      response: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      device: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      httpCode: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
      method: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("request");
  },
};
