const userRepository = require('../repository/user.repository.js');

async function addEnquiry(data){
    const enquiryData = {user_id:data.email, name:data.name,blood_group:data.bloodGroup, location:data.location, message:data.message }
    return userRepository.addEnquiry(enquiryData)
}

// to be updated not in use, does nothing right now
async function getEnquiries(){
    return await userRepository.getEnquiries()
}

module.exports = {
    addEnquiry,
    getEnquiries
}