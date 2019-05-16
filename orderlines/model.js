const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const Orderline = sequelize.define('orderlines', {
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        field: 'price',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'orderlines'
    })


module.exports = Orderline