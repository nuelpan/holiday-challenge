function errorHandler (err, req, res, next) {

  if(process.env.NODE_ENV === 'development') console.log(err)
  let status
  let message
  switch (err.name) {
    case 'SequelizeValidationError':
      const errors = []
      err.errors.forEach(error => errors.push(error.message))
      status = 400
      message = errors
      break;
    case 'JsonWebTokenError':
      status = 401
      message = err.message
      break;
    default:
      status = err.status || 500
      message = err.message || err.msg || 'Internal Server Error'
      break;
  }
  res.status(status).json({
    code: status,
    message
  })
}

module.exports = errorHandler