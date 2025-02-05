const QRcode = require('qrcode');
const multer = require('multer')


exports.formatData = (data) => {
  const qrcTxt = `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nORG:${data.company}\nTEL:${data.phone}\nEMAIL:${data.email}\nADR:${data.address}\nEND:VCARD`
  return qrcTxt
}

exports.generateQR = async (qrcTxt) => {
  const options = {
    errorCorrectionLevel: 'H',
    type: 'image/jpeg',
    margin: 1,
  }

  const qrCode = await QRcode.toBuffer(qrcTxt, options)
  return qrCode

}

// first we need to save the image to a file using multer

exports.upload = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  return multer({ storage: storage })
}
