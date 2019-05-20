'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('orders', 'payment_amount', {
                    type: Sequelize.STRING,
                    allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('orders', 'payment_started', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                }, { transaction: t }),
                queryInterface.addColumn('orders', 'payment_ok', {
                    type: Sequelize.BOOLEAN,
                    defaultValue: false,
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('orders', 'payment_amount', { transaction: t }),
                queryInterface.removeColumn('orders', 'payment_started', { transaction: t }),
                queryInterface.removeColumn('orders', 'payment_ok', { transaction: t })
            ])
        })
    }
};
