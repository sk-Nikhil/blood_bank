const userService = require('../services/user.service.js');
const Joi = require('joi');

async function addEnquiry(req,res){
    const schema = Joi.object().keys({
        name:Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
            'string.pattern.base': 'Name should not contain numbers or special characters',
        }),
        email: Joi.string().email({ minDomainSegments: 1, tlds: { allow: ['com'] } }),
        bloodGroup:Joi.string().required(),
        location:Joi.string().required(),
        message:Joi.string().required(),
    })

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({error:schema.validate(req.body).error.details});
    }

    try{
        await userService.addEnquiry(req.body);
        res.send()
    }
    catch(err){
        console.log(err.message);
        return res.send({error:err.message})
    }
}

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
        return res.send({error:err.message})
    }
}

module.exports={
    addEnquiry,
    getEnquiries
}