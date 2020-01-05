const bcryptjs = require('bcryptjs')

module.exports = {
  hash: (password) => {
    salt = bcryptjs.genSaltSync(6)
    return bcryptjs.hashSync(password, salt)
  },
  compare: (password, hash) => {
    return bcryptjs.compareSync(password, hash)
  }
}