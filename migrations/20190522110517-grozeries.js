'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('orderlines', 'total_price', {
                    type: Sequelize.INTEGER,
                    allowNull: true
                }, { transaction: t }),
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('orderlines', 'total_price', { transaction: t }),
            ])
        })
    }
};
