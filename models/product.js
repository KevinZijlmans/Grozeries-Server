'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    allergens: DataTypes.STRING,
    prices_by: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    in_stock: DataTypes.BOOLEAN,
    image: DataTypes.STRING,
    ShopId: DataTypes.INTEGER
  }, {});
  Product.associate = function (models) {
    Product.hasMany(models.Orderline)
    Product.belongsTo(models.Shop)
  };
  return Product;
};