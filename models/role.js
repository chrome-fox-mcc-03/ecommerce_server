'use strict';
module.exports = (sequelize, DataTypes) => {
  class Role extends sequelize.Sequelize.Model{
    static associate (models) {
      Role.hasMany(models.User)
    }
  }
  
  Role.init({
    name: {
      type : DataTypes.STRING
    }
  },{sequelize})
  return Role;
};