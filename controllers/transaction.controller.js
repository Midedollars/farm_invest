const FlutterWaveService = require('../services/flutterwave.service')
const { Helpers, ApiError } = require('../utils')
const {
  GenericHelper: { errorResponse, successResponse }
} = Helpers

const { validateCardCharge } = FlutterWaveService

class TransactionController {
  static async validateCharge (req, res, next) {
    try {
      const resp = await validateCardCharge({
        'otp': '12345',
        'flw_ref': req.charge.flw_ref
      })
      const data = resp.data.data
      return successResponse(res, {
        message :'Payment successful',
        data
      })
    } catch (e) {
      console.log(e)
      next(new ApiError({ message: 'VALIDATE_CARD_CHARGE_FAILED' }))
    }
  }
}

module.exports = TransactionController