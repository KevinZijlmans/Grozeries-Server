const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const Orderline = sequelize.define('orderlines', {
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: false
    },
    product: {
        type: Sequelize.STRING,
        field: 'product',
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

Orderline.HasOne(Product)

module.exports = Orderline