'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderline = sequelize.define('orderline', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    shopId: DataTypes.INTEGER
  }, {});
  Orderline.associate = function (models) {
    Orderline.belongsTo(models.product)
    Orderline.belongsTo(models.order)
    Orderline.belongsTo(models.shop)
  };
  return Orderline;
};