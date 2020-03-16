'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {}
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email Is Required'
        },
        isEmail: {
          args: true,
          msg: 'Invalid Email Format'
        }
      }
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  })
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};