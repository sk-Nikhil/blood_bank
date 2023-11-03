const UserEnquiry = require('../models/user_enquiry.js');
const Admin = require('../models/admin')

async function isUserExits(email){
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


async function addUser(user, password){
    const userData = new Admin({...user, password, role:"user"})   //registered  user and admin are stored in Admin collection
    try{
        await userData.save();
        // return User;
        return "User has been added successfully";
    }
    catch(err){
        throw Error(err);
    }
}

async function addEnquiry(data){
    try{
        const newEnquiry = new UserEnquiry({...data})
        await newEnquiry.save();
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
    getEnquiries,
    isUserExits,
    addUser
}