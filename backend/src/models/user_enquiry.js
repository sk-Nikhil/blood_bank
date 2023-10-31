const mongoose = require('mongoose');
const d = new Date();
const enquiry_date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;

const user_enquiry_schema = new mongoose.Schema({
    user_id:{
        type:String,
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
    message:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        required:true,
        trim:true,
        default:"pending"
    },
    enquiry_date:{
        type:String,
        required:true,
        default:enquiry_date
    }
});

const UserEnquiry = mongoose.model('enquirie', user_enquiry_schema);

module.exports = UserEnquiry;