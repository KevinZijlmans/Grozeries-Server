'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    product_name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    allergens: DataTypes.STRING,
    prices_by: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    in_stock: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    shopId: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    Product.hasMany(models.orderline)
    Product.belongsTo(models.shop)
  };
  return Product;
};