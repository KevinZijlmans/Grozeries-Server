const Sequelize = require('../node_modules/sequelize')
const sequelize = require('../db')

const User = sequelize.define('users', {
    first_name: {
        type: Sequelize.STRING,
        field: 'first_name',
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        field: 'last_name',
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        field: 'email',
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        field: 'password',
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
    user_type: {
        type: Sequelize.STRING,
        field: 'user_type',
        allowNull: false
    }
},
    {
        timestamps: true,
        tableName: 'users'
    })

  module.exports = User