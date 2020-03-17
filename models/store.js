'use strict';
module.exports = (sequelize, DataTypes) => {
  class Store extends sequelize.Sequelize.Model{}
  Store.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please insert the name of the store'
        },
        notEmpty: {
          msg: 'Please insert the name of the store'
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