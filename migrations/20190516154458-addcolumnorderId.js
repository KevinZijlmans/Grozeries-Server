'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.addColumn('Orderlines', 'orderId', {
        type: Sequelize.INTEGER
       });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColumn('Orderlines', 'orderId');
  }
};
