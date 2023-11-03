const adminService = require('../services/admin.service.js')

// get both pending and approved enquiries
async function getAllEnquiries(req,res){
    console.log(req.query)
    try{
        const response = await adminService.getAllEnquiries(req.query);
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
    getAllEnquiries,
    getPendingEnquiries,
    getTotalPendingEnquiries
}