const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv= require('dotenv')
const donorRouter = require('./routers/donors.js')
require('./db/mongoose.js')

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(donorRouter)
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(process.env.port, ()=>{
    console.log(`server started on port ${process.env.port}`)
})