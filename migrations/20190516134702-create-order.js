'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street_name: {
        type: Sequelize.STRING
      },
      house_number: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      delivery_time: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      payment_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: new Date(),
        type: Sequelize.DATE
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};