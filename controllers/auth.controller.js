const { Helpers, constants, DBError, ApiError } = require('../utils')

const {
  GenericHelper: { successResponse },
  AuthHelper: { addTokenToData, generateToken }
} = Helpers


class AuthController {
  static signIn (req, res) {
    const { user } = req
    const token = generateToken(user)
    const data = {
      token
    }
    successResponse(res, {
      data,
      message: 'LOGIN_USER_SUCCESS'
    })
  }

}

module.exports = AuthController
