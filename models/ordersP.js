// const Sequelize = require('sequelize/types')
// const sequelize = require('../db')
// const User = require('./usersP')
// const Orderline = require('./orderlinesP')

// const Order = sequelize.define('orders', {
//     street_name: {
//         type: Sequelize.STRING,
//         field: 'street_name',
//         allowNull: false
//     },
//     house_number: {
//         type: Sequelize.STRING,
//         field: 'house_number',
//         allowNull: false
//     },
//     zipcode: {
//         type: Sequelize.STRING,
//         field: 'zipcode',
//         allowNull: false
//     },
//     city: {
//         type: Sequelize.STRING,
//         field: 'city',
//         allowNull: false
//     },
//     comments: {
//         type: Sequelize.STRING,
//         field: 'comments',
//         allowNull: false
//     },
//     delivery_time: {
//         type: Sequelize.DATE,
//         field: 'delivery_time',
//         allowNull: false
//     },
//     status: {
//         type: Sequelize.STRING,
//         field: 'status',
//         allowNull: false
//     },
//     payment_id: {
//         type: Sequelize.INTEGER,
//         field: 'payment_id',
//         allowNull: false
//     }
// },
//     {
//         timestamps: true,
//         tableName: 'orders'
//     })

// Order.belongsTo(User)
// User.hasMany(Order)
// Order.hasMany(Orderline)
// Orderline.belongsTo(Order)


// module.exports = Order