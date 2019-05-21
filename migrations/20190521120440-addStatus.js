'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('orderlines', 'status', {
                    type: Sequelize.STRING,
                    defaultValue: 'pending'
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('orderlines', 'status', { transaction: t }),
            ])
        })
    }
};
