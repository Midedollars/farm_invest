const { fetchPackageById, updatePackageStatus, fetchAllPackages, fetchPackageCount} = require('../database/postgresql/queries/packages')
const db = require("../database/postgresql")
const { Helpers, ApiError } = require("../utils")

const { GenericHelper: { fetchResourceByPage, calcPages }} =Helpers

class PackageService {
  static getPackageById (package_id) {
    return db.oneOrNone(fetchPackageById, [package_id])
  }

  static updatePackageStatus (package_id, status) {
    return db.oneOrNone(updatePackageStatus, [package_id, status])
  }
  
  static async getAllPackages({ page, limit }) {
    try {
      const [count, packages] = await fetchResourceByPage({
        page,
        limit,
        getCount: fetchPackageCount,
        getResources: fetchAllPackages,
      })
      return {
        total: count.total,
        currentPage: page,
        totalPages: calcPages(count.total, limit),
        packages
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

module.exports = PackageService