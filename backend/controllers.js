const service = require('./service');
const path = require('path'); 
const fs= require('fs');
const Jimp = require('jimp');
const jsQR = require('jsqr');

exports.generateQR = async (req, res) => {
  const data = req.body
  const qrcTxt = service.formatData(data)
  const qrCode = await service.generateQR(qrcTxt)
  res.setHeader('Content-Disposition', 'attachment; filename=qrCode.jpg')
  res.type('image/jpeg').send(qrCode)
}



exports.decodeQr = async (req, res) => {
  const qrImage = req.file
  if (!qrImage) {
    return res.status(400).send('Please upload a QR code image')
  }


  // read the image file
  const filePath = req.file.path
  console.log(filePath)
  const image = await Jimp.Jimp.read(filePath)

  
  // decoding the qr code
  const { width, height } = image.bitmap;
  const qrCodeImageData = image.bitmap.data; 
  const clampedArray = new Uint8ClampedArray(qrCodeImageData.buffer, qrCodeImageData.byteOffset, qrCodeImageData.byteLength);
  const code = jsQR(clampedArray, width, height)
  console.log(typeof code.data)

  // send the decoded data to the client

  res.status(200).send({
    data: code.data
  })
}