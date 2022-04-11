const FlutterWaveHelper = require('../flutterwave/Helper')
const config = require('../config/config')
const constants = require('../flutterwave/constants')
const axios = require('axios')

const {
  CARD_CHARGE_ENPOINT,
  VALIDATE_CHARGE_ENDPOINT
} = constants


class FlutterWaveService {
  static async chargeCard (data) {
    const stringifiedData = FlutterWaveHelper.stringify(data)
    const encryptedData = FlutterWaveHelper.encrypt(stringifiedData)
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    const payload = {
      client: encryptedData
    }
    return await axios.post(CARD_CHARGE_ENPOINT, payload, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }

  static async validateCardCharge (data) {
    const secret = config.FLUTTER_WAVE_SECRET_KEY
    return await axios.post(VALIDATE_CHARGE_ENDPOINT, data, {
      headers: {
        Authorization: `Bearer ${secret}`
      }
    })
  }
}

module.exports = FlutterWaveService