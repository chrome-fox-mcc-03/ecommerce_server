'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Transaction extends Model { }
  Transaction.init({
    totalPrice: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, { sequelize })
  Transaction.associate = function (models) {
    // associations can be defined here
    Transaction.belongsTo(models.User)
    Transaction.hasMany(models.TransactionDetail)
  };
  return Transaction;
};