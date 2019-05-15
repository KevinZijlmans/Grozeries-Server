const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const Product = sequelize.define('products', {
    product_name: {
        type: Sequelize.STRING,
        field: 'product_name',
        allowNull: false
    },
    price: {
        type: Sequelize.STRING,
        field: 'price',
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: false
    },
    ingredients: {
        type: Sequelize.STRING,
        field: 'ingredients',
        allowNull: false
    },
    allergens: {
        type: Sequelize.STRING,
        field: 'allergens',
        allowNull: false
    },
    prices_by: {
        type: Sequelize.STRING,
        field: 'prices_by',
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: false
    },
    in_stock: {
        type: Sequelize.BOOLEAN,
        field: 'in_stock',
        allowNull: false
    },
    active: {
        type: Sequelize.STRING,
        field: 'active',
        allowNull: false
    },
    image: {
        type: Sequelize.STRING,
        field: 'image',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'products'
    })

  module.exports = Product