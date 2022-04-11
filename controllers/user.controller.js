const UserModel = require('../models/user.model')
const {Helpers, ApiError} = require('../utils')
const {
    GenericHelper: { errorResponse, successResponse }
  } = Helpers



class UserController {
  static async createUser(req, res, next) {
    try {
      const user = new UserModel({
          ...req.body,
      })
      console.log(user)
      const data = await user.save()
      return successResponse(res, {
        message: 'User created successfully',
        data
      })
  } catch (error) {
    console.log(error)
      next(new ApiError({
        message: 'CREATE_USER_ERROR',
      }))
    }
  } 
}

module.exports = UserController
