'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('Orders', 'payment_amount', {
                  type: Sequelize.STRING,
                  allowNull: true,
              }, { transaction: t }),
              queryInterface.addColumn('Orders', 'payment_started', {
                  type: Sequelize.BOOLEAN,
                  defaultValue: false,
              }, { transaction: t }),
              queryInterface.addColumn('Orders', 'payment_ok', {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('Orders', 'payment_amount', { transaction: t }),
              queryInterface.removeColumn('Orders', 'payment_started', { transaction: t }),
              queryInterface.removeColumn('Orders', 'payment_ok', { transaction: t })
          ])
      })
  }
};
