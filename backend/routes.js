const express = require('express')
const controllers = require('./controllers')
const service = require('./service')
const router =express.Router()

router.post('/generateQR', controllers.generateQR)
router.post('/decodeQrCode', service.upload().single("file"), controllers.decodeQr)

module.exports = router