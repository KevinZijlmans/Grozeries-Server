const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')
const Orderline = require('../orderlines/model')


const Product = sequelize.define('products', {
    product_name: {
        type: Sequelize.STRING,
        field: 'product_name',
        allowNull: true
    },
    price: {
        type: Sequelize.STRING,
        field: 'price',
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        field: 'description',
        allowNull: true
    },
    ingredients: {
        type: Sequelize.STRING,
        field: 'ingredients',
        allowNull: true
    },
    allergens: {
        type: Sequelize.STRING,
        field: 'allergens',
        allowNull: true
    },
    prices_by: {
        type: Sequelize.STRING,
        field: 'prices_by',
        allowNull: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        field: 'quantity',
        allowNull: true
    },
    in_stock: {
        type: Sequelize.BOOLEAN,
        field: 'in_stock',
        allowNull: true
    },
    image: {
        type: Sequelize.STRING,
        field: 'image',
        allowNull: true
    }
},
    {
        timestamps: true,
        tableName: 'products'
    })

Orderline.belongsTo(Product)
Product.hasMany(Orderline)

module.exports = Product