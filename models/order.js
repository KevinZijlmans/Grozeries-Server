'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    street_name: DataTypes.STRING,
    house_number: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    comments: DataTypes.STRING,
    delivery_time: DataTypes.DATE,
    status: DataTypes.STRING,
    payment_id: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    payment_amount: DataTypes.STRING,
    payment_started: DataTypes.BOOLEAN,
    payment_ok: DataTypes.BOOLEAN
  }, {});

  Order.associate = function (models) {
    Order.belongsTo(models.user)
    Order.hasMany(models.orderline)

  };
  return Order;
};