'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orderline = sequelize.define('Orderline', {
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    OrderId: DataTypes.INTEGER
  }, {});
  Orderline.associate = function (models) {
    Orderline.belongsTo(models.Product)
    Orderline.belongsTo(models.Order)
  };
  return Orderline;
};