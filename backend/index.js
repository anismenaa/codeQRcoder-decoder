const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const app = express()
const routes = require('./routes')


dotenv.config()

app.use(cors())

const PORT = process.env.PORT || 3001


app.use(express.json())
app.use(routes)



app.listen(PORT, () => {
  console.log(`this server designed for qr code generator is running on port ${PORT}`)
})



