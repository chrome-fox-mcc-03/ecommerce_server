'use strict';
const encrypt = require('../helper/encrypt')
module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {}
    User.init({
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email Already Used!!"
        },
        validate: {
          
          isEmail: {
            args: true,
            msg: "Must Be Filled in E-mail Format"
          },
          notNull: {
            args: true,
            msg: "Email Must Not Nulled"
          },
          notEmpty: {
            args: true,
            msg: "Email Must Be Filled"
          }

        }
      } ,
      Password: {
        type: DataTypes.STRING
      },
      Role: DataTypes.STRING 
    }, { 
      hooks:{
        beforeCreate(user, options) { 
          user.Password = encrypt(user.Password)

        }
      },
      sequelize, modelName: 'User' });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};