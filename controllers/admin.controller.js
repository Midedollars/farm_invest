const UserModel = require('../models/user.model')
const {Helpers, ApiError} = require('../utils')
const {
    GenericHelper: { errorResponse, successResponse }
  } = Helpers



class AdminController {
  static async createAdmin(req, res, next) {
    req.body.role = 'Admin'
    try {
      const admin = new UserModel({
          ...req.body,
      })
      const data = await admin.save()
      return successResponse(res, {
        message: 'Admin created successfully',
        data
      })
    } catch (error) {
      next(new ApiError({
        message: 'CREATE_ADMIN_ERROR',
      }))
    }
  } 
}

module.exports = AdminController
