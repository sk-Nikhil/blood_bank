const userService = require('../services/user.service.js');

async function addEnquiry(req,res){
    try{
        await userService.addEnquiry(req.body);
        res.send()
    }
    catch(err){
        console.log(err.message);
        return res.send({error:err.message})
    }
}

async function getEnquiries(){
    try{
        const enquiries = await userService.getEnquiries()
        res.send(enquiries)
    }
    catch(err){
        console.log(err.message);
        return res.send({error:err.message})
    }
}

module.exports={
    addEnquiry,
    getEnquiries
}