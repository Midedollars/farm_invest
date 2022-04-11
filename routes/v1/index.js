const { Router } = require('express');
const auth = require('./auth')
const package = require('./package')

const router = Router()

router.use('/auth', auth)
router.use('/package', package)

module.exports = router