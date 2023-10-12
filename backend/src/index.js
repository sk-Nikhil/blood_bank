const express = require('express')
const mongoose = require('./db/mongoose.js')
const bodyparser = require('body-parser')
const cors = require('cors')
const donorRouter = require('./routers/donors.js')

const port = 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use(donorRouter)
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(port, ()=>{
    console.log(`server started on port ${port}`)
})