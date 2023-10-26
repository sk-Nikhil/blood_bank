const Admin = require('../models/admin.js');
const adminRepository = require('../repository/admin.repository.js');
const bcrypt = require('bcryptjs')

async function addAdmin(admin){
    const adminExists = await adminRepository.ifAdminExits(admin.email);
    if(!adminExists){
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        const adminData = new Admin({...admin,password:hashedPassword, role:'admin'});
        return await adminRepository.addAdmin(adminData);
    }
    return "email is already registered with us";
}


module.exports = {
    addAdmin
} 