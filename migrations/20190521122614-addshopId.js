'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('orderlines', 'shopId', {
                    type: Sequelize.INTEGER
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('orderlines', 'shopId', { transaction: t }),
            ])
        })
    }
};
