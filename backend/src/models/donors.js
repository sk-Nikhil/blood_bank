const mongoose = require('mongoose');
const d = new Date();
const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

const donorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    bloodGroup:{
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
    lastDonated:{
        type:String,
        default:last_donated
    }
});

const Donor = mongoose.model('donorsData', donorSchema);

module.exports = Donor;