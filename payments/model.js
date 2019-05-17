const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')
const Order = require('../orders/model')

const Payment = sequelize.define('payments', {
    payment_ok: {
        type: Sequelize.BOOLEAN,
        field: 'payment_id',
        defaultValue: false,
        allowNull: true
    },
    order_id: {
        type: Sequelize.INTEGER,
        field: 'payment_id',
        allowNull: false
    },
    payment_amount: {
        type: Sequelize.STRING,
        field: 'payment_amount',
        defaultValue: false,
    },
    
},
    {
        timestamps: true,
        tableName: 'payments'
    })

Payment.belongsTo(Order)

module.exports = Payment