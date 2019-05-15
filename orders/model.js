const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')
const User = require('../users/model')
const Orderline = require('../orderlines/model')
const Shop = require('../shops/model')
const Product = require('../products/model')

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
Product.belongsTo(Order)
Order.belongsTo(User)
User.hasMany(Order)
Order.hasMany(Shop)
Shop.belongsTo(Order)
Order.hasMany(Orderline)
Orderline.belongsTo(Order)


module.exports = Order