const { verifyToken } = require('../helpers/jwt')
const User = require('../models').User

module.exports = {
  authenticate(req, res, next) {
    try {
      let {id} = verifyToken(req.headers.token)
      User.findById(id)
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
  }
}