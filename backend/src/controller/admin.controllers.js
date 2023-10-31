const adminService = require('../services/admin.service.js')

async function signup(req,res){
    try{
        const response = await adminService.addAdmin(req.body);
        res.send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

// get both pending and approved enquiries
async function getAllEnquiries(req,res){
    try{
        const response = await adminService.getAllEnquiries();
        res.send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({error:err.message});
    }
}

async function getPendingEnquiries(req,res){
    try{
        const response = await adminService.getPendingEnquiries();
        res.send(response);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({error:err.message});
    }
}

async function getTotalPendingEnquiries(req,res){
    try{
        const response = await adminService.getTotalPendingEnquiries();
        res.json({data:response});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}
module.exports = {
    signup,
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
}