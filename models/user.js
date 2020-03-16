'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User'
  })
  
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};