const mongoose = require('mongoose')
const d = new Date()
const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`

const donorSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    blood_group:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    contact:{
        type:String,
        required:true,
        trim:true
    },
    last_donated:{
        type:String,
        default:last_donated
    }
})

const Donor = mongoose.model('donors_data', donorSchema)

module.exports = Donor