'use strict';
module.exports = (sequelize, DataTypes) => {
  class Contact extends sequelize.Sequelize.Model {};
  Contact.init ({
    name: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [10, 13],
          msg: "Phone number length between 10 to 13 characters"
        },
        isUnique(phone, next) {
          return sequelize.models.Contact
            .findOne({ where: { phone } })
              .then(user => {
                if (user) next('Phone number already in use!')
                else next()
              })
              .catch(err => {
                next(err.message)
              })
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { sequelize });
  Contact.associate = function(models) {};
  return Contact;
};