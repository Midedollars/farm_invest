const FlutterWaveService = require('../services/flutterwave.service')
const { Helpers, ApiError } = require('../utils')
const {
  GenericHelper: { errorResponse, successResponse }
} = Helpers

const { chargeCard } = FlutterWaveService

class TransactionMiddleware {
  static async addTransactionref (req, res, next) {
    const ref = 'tx_ref' + Date.now().toString()
    req.body.tx_ref = ref
    next()
  }

  static async initCardCharge (req, res, next) {
    try {
      const resp = await chargeCard(req.body)
      req.charge = resp.data.data
      next()
    } catch (e) {
      console.log(e.message)
      errorResponse(
        req,
        res,
        new ApiError({ message: 'CHARGE_INITIATION_FAILED' })
      )
    }
  }
}

module.exports = TransactionMiddleware