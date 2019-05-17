'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define('Shop', {
    shop_name: DataTypes.STRING,
    email: DataTypes.STRING,
    street_name: DataTypes.STRING,
    house_number: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    business_hours: DataTypes.STRING,
    shop_image: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    UserId: DataTypes.INTEGER
  }, {});
  Shop.associate = function (models) {
    Shop.hasMany(models.Product)
    Shop.belongsTo(models.User)
  };
  return Shop;
};