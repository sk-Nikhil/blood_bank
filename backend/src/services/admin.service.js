const adminRepository = require('../repository/admin.repository.js');

async function getAllEnquiries(query){
    const limit = parseInt(query.itemsPerPage);
    const page = parseInt(query.page) || 1;
    const skip = (page - 1) * limit;
    try{
        const totalEnquiries = await adminRepository.getTotalEnquiries();
        const enquiries = await adminRepository.getAllEnquiries(skip, limit);
        return {totalEnquiries, enquiries};
    }
    catch(error){
        return error;
    }
}

async function updateEnquiry(query){
    let data={};
    if(query.action === 'approve')
        data = {...query, action:'approved'};
    else{
        data = {...query, action:'rejected'};
    }
    return await adminRepository.updateEnquiry(data);
}

async function getPendingEnquiries(){
    return await adminRepository.getPendingEnquiries();
}

async function getTotalPendingEnquiries(){
    return await adminRepository.getTotalPendingEnquiries();
}

module.exports = {
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries,
    updateEnquiry
} 