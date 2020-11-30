("use strict");

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable("analytics", {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.UUID,
      },
      eventKey: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      eventValue: {
        allowNull: true,
        type: DataTypes.TEXT,
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
    return queryInterface.dropTable("analytics");
  },
};
