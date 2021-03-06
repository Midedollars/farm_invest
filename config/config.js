require('dotenv').config()

module.exports = {
  FLUTTER_WAVE_ENCRYPTION_KEY: process.env.FLUTTER_WAVE_ENCRYPTION_KEY,
  FLUTTER_WAVE_SECRET_KEY: process.env.FLUTTER_WAVE_SECRET_KEY,
  FLUTTER_WAVE_PUBLIC_KEY: process.env.FLUTTER_WAVE_PUBLIC_KEY,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  PORT: process.env.PORT
}