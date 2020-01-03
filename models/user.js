'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {};
  User.init ({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize });
  User.associate = function(models) {
    User.hasMany(models.Contact)
  };
  return User;
};