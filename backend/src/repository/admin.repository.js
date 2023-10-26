const Admin = require('../models/admin.js')

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

async function ifAdminExits(email){
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

module.exports = {
    addAdmin,
    ifAdminExits
}