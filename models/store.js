'use strict';
module.exports = (sequelize, DataTypes) => {
  class Store extends sequelize.Sequelize.Model{}
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validation: {
        isNull: {
          msg: 'Please insert the name of the product'
        },
        isEmpty: {
          msg: 'Please insert the name of the product'
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Store'
  });
  Store.associate = function(models) {
    Store.hasMany(models.Product, { foreignKey: 'store_id' })
    Store.hasMany(models.User, { foreignKey: 'store_id' })
  };
  return Store;
};