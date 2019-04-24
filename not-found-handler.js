'use strict'

const createError = require('http-errors')

module.exports = function notFoundMiddleware (message = 'Route not found') {
  return function notFoundHandler (req, res, next) {
    next(createError(404, message))
  }
}
