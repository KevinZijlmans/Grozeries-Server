'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('orderlines', 'userId', {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }, { transaction: t }),
                //     queryInterface.addColumn('users', 'orderId', {
                //       type: Sequelize.INTEGER,
                //       allowNull: true
                //   }, { transaction: t }),
                queryInterface.addColumn('users', 'shopId', {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('orderlines', 'userId', { transaction: t }),
                // queryInterface.removeColumn('users', 'orderId', { transaction: t }),
                queryInterface.removeColumn('users', 'shopId', { transaction: t }),
            ])
        })
    }
};