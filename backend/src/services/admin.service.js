const Admin = require('../models/admin.js');
const adminRepository = require('../repository/admin.repository.js');
const bcrypt = require('bcryptjs')

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
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
} 