const { verifyToken } = require('../helpers/jwt')
const User = require('../models').User
const Contact = require('../models').Contact

module.exports = {
  authenticate(req, res, next) {
    try {
      console.log(req.headers.token)
      let {id} = verifyToken(req.headers.token)
      User.findByPk(id)
        .then(user => {
          if (user) {
            req.decodedId = id
            next()
          }
          else next({
            status: 401,
            message: 'Authentication failed!'
          })
        })
    } catch (error) {
      next(error)
    }
  },
  authorize(req, res, next) {
    try {
      let id = req.params.id
      Contact.findByPk(id)
        .then(contact => {
          if (contact) {
            if (contact.UserId === req.decodedId) {
              next()
            }
            else next({
              status: 403,
              message: 'You are not authorized!'
            })
          } else {
            next({
              status:400, 
              message:'Contact not found!'
            })
          }
        })
        .catch(next)
    } catch (error) {
      next(error)
    }
  }
}