const db = require('../database/postgresql')
const queries = require('../database/postgresql/queries/packages')
const { createFarmPackage } = queries;

class PackageModel {
  constructor(options) {
    this.package_name = options.package_name;
    this.farm_name = options.farm_name;
    this.location = options.location;
    this.amount_per_unit = options.amount_per_unit;
  }

  async save() {
    try {
      return db.one(createFarmPackage, [
        this.package_name,
        this.farm_name,
        this.location,
        this.amount_per_unit
      ])
    } catch (error) {
      console.log(error);
      throw error
    }
  }
}

module.exports = PackageModel