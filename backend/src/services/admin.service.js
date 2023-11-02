const Admin = require('../models/admin.js');
const adminRepository = require('../repository/admin.repository.js');
const bcrypt = require('bcryptjs')

async function addAdmin(admin){
    try{
        // check if admin exists with the given email or not
        // if it exists return a custom message and if not add the admin data
        const adminExists = await adminRepository.isAdminExits(admin.email);
        if(!adminExists){
            const hashedPassword = await bcrypt.hash(admin.password, 10);
            const adminData = new Admin({...admin,password:hashedPassword});
            return await adminRepository.addAdmin(adminData);
        }
        return "email is already registered with us";
    }
    catch(err){
        return err
    }
}

async function getAllEnquiries(query){
    const limit = parseInt(query.itemsPerPage);
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    try{
        const totalEnquiries = await adminRepository.getTotalEnquiries()
        const enquiries = await adminRepository.getAllEnquiries(skip, limit)
        return {totalEnquiries, enquiries}
    }
    catch(err){
        return err
    }
}

async function getPendingEnquiries(){
    return await adminRepository.getPendingEnquiries();
}

async function getTotalPendingEnquiries(){
    return await adminRepository.getTotalPendingEnquiries()
}

module.exports = {
    addAdmin,
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
} 