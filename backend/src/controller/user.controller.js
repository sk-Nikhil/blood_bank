const userService = require('../services/user.service.js');

async function addEnquiry(req,res){
    try{
        await userService.addEnquiry(req.body);
        return res.send();
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({error:"unable to process your request"})
    }
}

// getEnquiries right now has not been used anywhere and it does nothing, its just a prototype, to be updated for further operations
async function getEnquiries(req,res){
    try{
        const enquiries = await userService.getEnquiries();
        // const enquiries=[]  
        if(enquiries.length == 0){
            return res.status(204).send()
        }
        return res.send(enquiries)
    }
    catch(err){
        console.log(err.message);
        return res.status(500).send({error:"unable to fetch your requested data"})
    }
}

module.exports={
    addEnquiry,
    getEnquiries
}