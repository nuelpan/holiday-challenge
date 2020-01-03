'use strict';
module.exports = (sequelize, DataTypes) => {
  class Contact extends sequelize.Sequelize.Model {};
  Contact.init ({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Contact.associate = function(models) {};
  return Contact;
};