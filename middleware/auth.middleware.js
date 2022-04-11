const UserService = require('../services/user.services');
const { Helpers, constants, ApiError, genericErrors } = require('../utils')

const { getUserByEmail } = UserService
const {
  GenericHelper: { errorResponse, checkArrayIsNotEmpty },
  AuthHelper: { generateToken, verifyToken, compareHash }
} = Helpers

/**
 * A collection of middleware used to verify a user before accessing protected resources
 */
class AuthMiddleware {
  static compareUserPassword (req, res, next) {
    const { user, body } = req
    const isAuthenticUser = compareHash(
      body.password,
      user.password
    )
    if (!isAuthenticUser) {
      return errorResponse(req, res, genericErrors.inValidLogin)
    }
    next()
  }

  static async loginEmailValidator (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      req.user = checkArrayIsNotEmpty(data)
      return req.user 
        ? next()
        : errorResponse(req, res, genericErrors.inValidLogin)
    } catch (e) {
      errorResponse(
        req,
        res,
        new ApiError({ message: 'USER_EMAIL_EXIST_VERIFICATION_FAIL_MSG' })
      )
    }
  }


  static checkAuthorizationToken (authorization) {
    let bearerToken = null
    if (authorization) {
      const token = authorization.split(' ')[1]
      bearerToken = token || authorization
    }
    return bearerToken
  }

  static checkToken (req) {
    const { authorization } = req.headers
    const bearerToken = AuthMiddleware.checkAuthorizationToken(authorization)
    return (
      bearerToken ||
      req.headers['x-access-token'] ||
      req.headers.token ||
      req.body.token
    )
  }

  static authenticate (req, res, next) {
    const token = AuthMiddleware.checkToken(req)
    if (!token) {
      return errorResponse(req, res, genericErrors.authRequired)
    }
    try {
      const decoded = verifyToken(token)
      req.user = decoded
      next()
    } catch (err) {
      errorResponse(req, res, genericErrors.authRequired)
    }
  }

  static checkRole(req, res, next) {
    const { user: { role } } = req
    return role === 'Admin'
      ? next()
      : errorResponse(req, res, genericErrors.unAuthorized)
  }

}

module.exports = AuthMiddleware
