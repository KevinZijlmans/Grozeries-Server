'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      street_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      house_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      zipcode: {
        allowNull: true,
        type: Sequelize.STRING
      },
      city: {
        allowNull: true,
        type: Sequelize.STRING
      },
      comments: {
        allowNull: true,
        type: Sequelize.STRING
      },
      delivery_time: {
        allowNull: true,
        type: Sequelize.DATE
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_id: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      payment_amount: {
        allowNull: true,
        type: Sequelize.STRING
      },
      payment_started: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      payment_ok: {
        allowNull: true,
        type: Sequelize.BOOLEAN
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
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('orders');
  }
};