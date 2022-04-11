const forge = require('node-forge');
const config = require('../config/config');

class FlutterWaveHelper {
  static encrypt (text) {
    const key = config.FLUTTER_WAVE_ENCRYPTION_KEY
    const cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(key)
    )
    cipher.start({
      iv: ''
    })
    cipher.update(forge.util.createBuffer(text, 'utf-8'))
    cipher.finish()
    const encrypted = cipher.output
    return forge.util.encode64(encrypted.getBytes())
  }

  static stringify (data) {
    return JSON.stringify(data)
  }
}

module.exports = FlutterWaveHelper