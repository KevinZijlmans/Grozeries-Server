'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    street_name: DataTypes.STRING,
    house_number: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    city: DataTypes.STRING,
    comments: DataTypes.STRING,
    delivery_time: DataTypes.DATE,
    status: DataTypes.STRING,
    payment_id: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    payment_amount: DataTypes.STRING,
    payment_started: DataTypes.BOOLEAN,
    payment_ok: DataTypes.BOOLEAN,
  }, {});

  Order.associate = function (models) {
    Order.belongsTo(models.User)
    Order.hasMany(models.Orderline)

  };
  return Order;
};