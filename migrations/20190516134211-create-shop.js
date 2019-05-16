'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shops', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shop_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
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
      phonenumber: {
        type: Sequelize.STRING
      },
      business_hours: {
        type: Sequelize.STRING
      },
      shop_image: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shops');
  }
};