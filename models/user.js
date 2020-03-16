'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {}
  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique: true,
      validate: {
        isEmail : {
          args : true,
          msg : "Invalid email address"
        },
        notEmpty : {
          args : true,
          msg : 'Email cannot be empty'
        },
        notNull : {
          args : true,
          msg : 'Email cannot be empty'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          args : true,
          msg : 'Password cannot be empty'
        },
        len : {
          args : [6],
          msg : "Password atleast has 6 characters"
        }
      } 
    },
    role: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty : {
          args : true,
          msg : 'Role cannot be empty'
        }
      } 
    },
  },{
    sequelize,
    modelName : 'User'
  })

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};