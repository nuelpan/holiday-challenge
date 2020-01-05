const jwt = require('jsonwebtoken')

module.exports = {
  signToken: (payload) => {
    return jwt.sign(payload, process.env.SECRET)
  },
  verifyToken: (payload) => {
    return jwt.verify(payload, process.env.SECRET)
  }
}