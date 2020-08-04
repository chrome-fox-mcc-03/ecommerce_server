'use strict';
module.exports = (sequelize, DataTypes) => {
  const TransactionDetail = sequelize.define('TransactionDetail', {
    productName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    img_url: DataTypes.STRING,
    ProductId: DataTypes.INTEGER
  }, { sequelize });
  TransactionDetail.associate = function (models) {
    // associations can be defined here
    TransactionDetail.belongsTo(models.Transaction)
  };
  return TransactionDetail;
};