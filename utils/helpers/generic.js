const constants = require('../constants')
const DBError = require('../errors/db.error')
const genericError = require('../errors/generic')
const db = require('../../database/postgresql')

const { serverError } = genericError
const { FAIL, SUCCESS, SUCCESS_RESPONSE } = constants


class GenericHelper {
 
  static async validateInput (schema, object) {
    return schema.validateAsync(object)
  }

  
  static getIpAddress (req) {
    return req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress
  }


  static successResponse (
    res,
    { data, message = SUCCESS_RESPONSE, code = 200 }
  ) {
    return res.status(code).json({
      status: SUCCESS,
      message,
      data
    })
  }

  
  static errorResponse (req, res, error) {
    const aggregateError = { ...serverError, ...error }
    return res.status(aggregateError.status).json({
      status: FAIL,
      message: aggregateError.message,
      errors: aggregateError.errors
    })
  }

  static checkArrayIsNotEmpty (array) {
    if (array.length === 0) {
      return null
    }
    if (array.length === 1) {
      return array[0]
    }
    return array
  }

  static async fetchResourceByPage({
    page,
    limit,
    getCount,
    getResources,
    params = [],
    countParams = []
  }) {
    const offSet = (page - 1) * limit;
    const fetchCount = db.one(getCount, [...countParams]);
    const fetchCountResource = db.any(getResources, [offSet, limit, ...params]);
    return Promise.all([fetchCount, fetchCountResource]);
  }

  static calcPages(total, limit) {
    const displayPage = Math.floor(total / limit);
    return total % limit ? displayPage + 1 : displayPage;
  }
}

module.exports = GenericHelper
