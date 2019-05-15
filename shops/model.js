const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')
const User = require('../users/model')
const Product = require('../products/model')

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
    street_name: {  
        type: Sequelize.STRING,
        field: 'street_name',
        allowNull: false
    },
    house_number: {
        type: Sequelize.STRING,
        field: 'house_number',
        allowNull: false
    },
    zipcode: {
        type: Sequelize.STRING,
        field: 'zipcode',
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        field: 'city',
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
    },
    shop_image: {
        type: Sequelize.STRING,
        field: 'shop_image',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'shops'
    })
Shop.hasMany(Product)
Product.belongsTo(Shop)
Shop.hasMany(User)
User.belongsTo(Shop)

module.exports = Shop