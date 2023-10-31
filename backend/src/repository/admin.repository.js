const Admin = require('../models/admin.js');
const UserEnquiry = require('../models/user_enquiry.js')

async function addAdmin(admin){
    try{
        const Admin = await admin.save();
        return Admin;
        // return "Admin has been added successfully";
    }
    catch(err){
        throw Error(err);
    }
}

async function isAdminExits(email){
    try{
        const admin = await Admin.findOne({email})
        if(admin) {
            return true
        }
        return false
    }
    catch(err){
        throw Error(err)
    }
}

async function getAllEnquiries(){
    try{
        return await UserEnquiry.find({});
    }
    catch(err){
        throw Error(err);
    }
}

async function getPendingEnquiries(){
    try{
        return await UserEnquiry.find({status:"pending"});
    }
    catch(err){
        throw Error(err);
    }
}

async function getTotalPendingEnquiries(){
    try{
        return await UserEnquiry.countDocuments({status:"pending"});
    }
    catch(err){
        throw Error(err);
    }
}

module.exports = {
    addAdmin,
    isAdminExits,
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
}