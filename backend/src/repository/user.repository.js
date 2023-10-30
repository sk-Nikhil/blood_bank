const UserEnquiry = require('../models/user_enquiry.js')

async function addEnquiry(data){
    try{
        const newEnquiry = new UserEnquiry({...data})
        await newEnquiry.save()
        return true;
    }
    catch(err){
        throw Error(err)
    }
}

async function getEnquiries(){
    try{
        return await UserEnquiry.find({})
    }
    catch(err){
        throw Error(err)
    }
}

module.exports = {
    addEnquiry,
    getEnquiries
}