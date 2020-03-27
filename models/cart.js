'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Cart extends Model {}
  Cart.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    }
  },
  {
    sequelize
  })
  Cart.associate = function(models) {
    Cart.belongsTo(models.User)
    Cart.belongsToMany(models.Product, { through: models.CartProduct})
  };
  return Cart;
};