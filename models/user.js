'use strict';
module.exports = (sequelize, DataTypes) => {

  class User extends sequelize.Sequelize.Model {}
    User.init({
      Email: {
        type: DataTypes.STRING,
        allowNull: false,
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
      } 
    }, { sequelize, modelName: 'User' });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};