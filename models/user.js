'use strict';

const { hash } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {};
  User.init ({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email format is incorrect"
        },
        isUnique(email, next) {
          return sequelize.models.User
            .findOne({ where: { email } })
              .then(user => {
                if (user) next('Email address already in use!')
                else next()
              })
              .catch(err => {
                next(err.message)
              })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 20],
          msg: 'Password length between 6 to 20 characters',
        }
      }
    }
  }, 
  { 
    hooks: {
      beforeCreate(user) {
        user.password = hash(user.password)
        console.log(hash(user.password))
      }
    },
    sequelize 
  });
  User.associate = function(models) {
    User.hasMany(models.Contact)
  };
  return User;
};