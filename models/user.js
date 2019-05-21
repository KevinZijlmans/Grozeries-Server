'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    street_name: DataTypes.STRING,
    house_number: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    user_type: DataTypes.STRING,
    orderId: DataTypes.INTEGER,
    shopId: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    User.hasMany(models.order)
    User.hasMany(models.orderline)
  };
  return User;
};