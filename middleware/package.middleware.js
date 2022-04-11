
const PackageService = require('../services/package.service')
const { getPackageById } = PackageService
const {Helpers, ApiError} = require('../utils')
const {
    GenericHelper: { errorResponse, successResponse }
  } = Helpers

class PackageMiddleware {
  static async checkIfPackageExists(req, res, next) {
    try {
      req.package = await getPackageById(Number(req.params.id))
      return req.package
        ? next()
        : errorResponse(
          req,
          res,
          new ApiError({
            status: 404,
            message: 'Package not found'
          })
        )
    } catch (error) {
      console.log(error)
      next(new ApiError({
        message: 'GET_PACKAGE_ERROR'
      }))
    }
  }

  static calculateAmount(req, res, next) {
    // const { package, body } = req
    const amount = req.package.amount_per_unit * req.body.unit
    req.body.amount = amount
    delete req.body.unit
    return next()
  }

}

module.exports = PackageMiddleware