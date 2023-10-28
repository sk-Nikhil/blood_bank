const Admin = require('../models/admin.js');
const adminRepository = require('../repository/admin.repository.js');
const bcrypt = require('bcryptjs')

async function addAdmin(admin){
    const adminExists = await adminRepository.ifAdminExits(admin.email);
    if(!adminExists){
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const adminData = new Admin({...admin,password:hashedPassword});
        return await adminRepository.addAdmin(adminData);
    }
    return "email is already registered with us";
}

async function getAllEnquiries(){
    return await adminRepository.getAllEnquiries()
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