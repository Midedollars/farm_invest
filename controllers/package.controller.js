const PackageModel = require('../models/package.model')
const PackageService = require('../services/package.service')

const { updatePackageStatus, getAllPackages } = PackageService
const { Helpers, ApiError} = require('../utils')
const {
    GenericHelper: { errorResponse, successResponse }
  } = Helpers

class PackageController {
  static async createPackage(req, res, next) {
    try {
      const farmPackage = new PackageModel({
        ...req.body,
      })
      const data = await farmPackage.save()
      return successResponse(res, {
        message: 'Package created successfully',
        data
      })
    } catch (error) {
      console.log(error)
        next(new ApiError({
            message: 'CREATE_PACKAGE_ERROR',
        }))
    }
  }

  static async fetchAllPackages(req, res, next) {
    try {
      const data = await getAllPackages(req.query)
      return successResponse(res, {
        message: 'Packages fetched successfully',
        data
      })
    } catch (error) {
      console.log(error)
      next(new ApiError({
        message: 'GET_ALL_PACKAGE_ERROR'
      }))
    }
  }

  static async updatePackageStatus(req, res, next) {
    try {
      const data = await updatePackageStatus(req.params.id, req.body.status)
      return successResponse(res, {
        message: 'Package status updated successfully',
        data
      })
    } catch (error) {
      console.log(error)
      next(new ApiError({
        message: 'UPDATE_PACKAGE_STATUS_ERROR'
      }))
    }
  }
}

module.exports = PackageController