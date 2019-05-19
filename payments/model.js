const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')
const Order = require('../orders/model')

const Payment = sequelize.define('payments', {
    order_id: {
        type: Sequelize.INTEGER,
        field: 'payment_id',
        allowNull: false
    },
    payment_ok: {
        type: Sequelize.BOOLEAN,
        field: 'payment_id',
        defaultValue: false,
        allowNull: true
    },
    payment_amount: {
        type: Sequelize.STRING,
        field: 'payment_amount',
        allowNull: true
    },    
},
    {
        timestamps: true,
        tableName: 'payments'
    })

Payment.belongsTo(Order)

module.exports = Payment