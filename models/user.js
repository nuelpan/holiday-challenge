'use strict';
module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {};
  User.init ({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: DataTypes.STRING
  }, { sequelize });
  User.associate = function(models) {
    User.hasMany(models.Contact)
  };
  return User;
};