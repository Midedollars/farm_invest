const UserService = require('../services/user.services')
const { Helpers, ApiError } = require('../utils')

const { getUserByEmail } = UserService
const {
  GenericHelper: { errorResponse, checkArrayIsNotEmpty }
} = Helpers

class UserMiddleware {
  static async validateSignUpEmail (req, res, next) {
    try {
      const [data] = await getUserByEmail(req.body.email)
      const user = checkArrayIsNotEmpty(data)
      return user
        ? errorResponse(
          req,
          res,
          new ApiError({
            status: 409,
            message: EMAIL_CONFLICT
          })
        )
        : next()
    } catch (error) {
      const apiError = new ApiError({
        status: 500,
        message: INTERNAL_SERVER_ERROR
      })
      errorResponse(req, res, apiError)
    }
  }   
}

module.exports = UserMiddleware