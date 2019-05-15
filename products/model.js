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