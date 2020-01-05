const User = require('../models').User
const { signToken } = require('../helpers/jwt')
const { compare } = require('../helpers/bcrypt')

class UserController {
  static register(req, res, next) {
    const { email, password } = req.body
    User.create({
      email,
      password
    })
      .then( ({ dataValues }) => {
        const token = signToken({id: dataValues.id})
        console.log(token)
        res.status(201).json({ token })
      })
      .catch(err => next(err))
  }

  static login(req, res, next){
    const { email, password } = req.body
    User.findOne({ where: { email } })
      .then(({dataValues}) => {
        if (dataValues) {
          if(compare(password, dataValues.password)) {
            const token = signToken({id: dataValues.id})
            res.status(201).json({ token })
          } else {
            next({
              status: 400,
              message: 'Your email or password is invalid!'
            })
          }
        } else {
          next({status: 400, message: 'User not found!'})
        }
      })
      .catch(next) 
  }
}

module.exports = UserController