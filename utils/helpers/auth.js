const jwt = require('jsonwebtoken')
const config = require('../../config/config');
const bcrypt = require('bcrypt')



class AuthHelper {
  static generateToken (payload, expiresIn = '2d') {
    return jwt.sign(payload, config.SECRET_TOKEN, { expiresIn })
  }
  static verifyToken (token) {
    return jwt.verify(token, config.SECRET_TOKEN)
  }

  static hashPassword (password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
  }

  static compareHash (plainpassword, hashedpassword) {
    return bcrypt.compareSync(plainpassword, hashedpassword)
  }
}

module.exports = AuthHelper
