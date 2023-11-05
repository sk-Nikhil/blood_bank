const Admin = require('../models/admin.js');
const UserEnquiry = require('../models/user_enquiry.js')

async function getTotalEnquiries(){
    try{
        return await UserEnquiry.find().countDocuments()
    }
    catch(error){
        throw Error(error)
    }
}

async function getAllEnquiries(skip, limit){
    try{
        return await UserEnquiry.find().skip(skip).limit(limit);
    }
    catch(error){
        throw Error(error);
    }
}

async function updateEnquiry(query){
    try{
        return await UserEnquiry.findOneAndUpdate({_id:query._id}, {status:query.action});
    }
    catch(error){
        throw Error(error)
    }
}

async function getPendingEnquiries(){
    try{
        return await UserEnquiry.find({status:"pending"});
    }
    catch(error){
        throw Error(error);
    }
}

async function getTotalPendingEnquiries(){
    try{
        return await UserEnquiry.countDocuments({status:"pending"});
    }
    catch(error){
        throw Error(error);
    }
}

module.exports = {
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries,
    getTotalEnquiries,
    updateEnquiry
}