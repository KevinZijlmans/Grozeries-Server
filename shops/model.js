const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const Shop = sequelize.define('shops', {
    shop_name: {
        type: Sequelize.STRING,
        field: 'shop_name',
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        field: 'address',
        allowNull: false
    },
    phonenumber: {
        type: Sequelize.STRING,
        field: 'phonenumber',
        allowNull: false
    },
    business_hours: {
        type: Sequelize.STRING,
        field: 'business_hours',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'shops'
    })
Shop.hasMany(Product)
Shop.hasMany(User)

module.exports = Shop