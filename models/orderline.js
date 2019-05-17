'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderline = sequelize.define('Orderline', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {});
  Orderline.associate = function (models) {
    Orderline.belongsTo(models.Product)
    Orderline.belongsTo(models.Order)
  };
  return Orderline;
};