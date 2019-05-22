'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'orderlines', 'total_price',
          {
            type: Sequelize.FLOAT,
            allowNull: true,
          }
          , { transaction: t }),
        queryInterface.changeColumn(
          'orderlines', 'price',
          {
            type: Sequelize.FLOAT,
            allowNull: false,
          }
          , { transaction: t }),
        queryInterface.changeColumn(
          'products', 'price',
          {
            type: Sequelize.FLOAT,
            allowNull: false,
          }
          , { transaction: t })

      ])
    })
  },

};

