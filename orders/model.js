const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const Order = sequelize.define('orders', {
    address: {
        type: Sequelize.STRING,
        field: 'address',
        allowNull: false
    },
    comments: {
        type: Sequelize.STRING,
        field: 'comments',
        allowNull: false
    },
    delivery_time: {
        type: Sequelize.DATE,
        field: 'delivery_time',
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        field: 'status',
        allowNull: false
    },
    payment_id: {
        type: Sequelize.INTEGER,
        field: 'payment_id',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'orders'
    })
Order.hasMany(Product)
Order.belongsTo(User)
Order.hasMany(Shop)
Order.hasMany(Orderline)


module.exports = Order