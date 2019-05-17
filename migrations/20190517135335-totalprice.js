'use strict';

module.exports = {
 up: (queryInterface, Sequelize) => {

     return queryInterface.addColumn('Orders', 'total_price', {
       type: Sequelize.INTEGER
      });
 },

 down: (queryInterface, Sequelize) => {

     return queryInterface.removeColumn('Orders', 'total_price');
 }
};