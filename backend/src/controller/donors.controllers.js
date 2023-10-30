const donorService = require('../services/donor.service.js');
const Joi = require('joi');

async function addDonor(req,res){
    const schema = Joi.object().keys({
        id:Joi.string().required(),
        name:Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
            'string.pattern.base': 'Name should not contain numbers or special characters',
        }),
        blood_group:Joi.string().required(),
        address:Joi.string().required(),
        contact:Joi.number().required(),
        last_donated:Joi.string().required()
    })

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({error:schema.validate(req.body).error.details});
    }

    try{
        const name = await donorService.addDonor(req.body);
        res.status(200).send(`Donor ${name} added successfully`);
    }
    catch(err){
        res.status(401).send(err.message);
    }
}

async function getDonors(req,res){
    const schema = Joi.object({
        page: Joi.number().optional(),
    });

    if (schema.validate(req.query).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({error:schema.validate(req.body).error.details});
    }   

    const page = parseInt(req.query.page) || 1;
    try {
        const donor = await donorService.getDonors(page);
        res.status(200).send(donor);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

async function getFilteredDonors(req,res){
    const page = parseInt(req.query.page) || 1;
    const query = req.params.searchTerm;
    try {
        const donors = await donorService.getFilteredDonors(page, query);
        res.status(200).send(donors);
    }
    catch(err) {
        console.log(err.message);
        res.status(401).send(err.message);
    }
}

async function removeDonor(req,res){
    const schema = Joi.object().keys({
        id:Joi.string().alphanum().required(),
    })

    if (schema.validate(req.params).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({error:schema.validate(req.body).error.details});
    }
    try{
        const donor_name = await donorService.removeDonor(req.params.id);
        res.status(200).send({data:`donor ${donor_name} is removed successfully`});
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function updateDonor(req,res){
    // validation, only thhese should be present in body
    const schema = Joi.object().keys({
        _id:Joi.string().alphanum().required(),
        address:Joi.string().required(),
        contact:Joi.number().required(),
    })

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({error:schema.validate(req.body).error.details});       //if any validation error
    }

    try{
        await donorService.updateDonor(req.body);
        res.status(200).send({data:"donor details has been updated successfully"});         //if success
    }
    catch(err){
        console.log(err.message);
        res.status(401).send(err.message);                                                  //if any error occurs
    }
}

async function countBloodGroups(req,res){
    try{
        const counts = await donorService.countBloodGroups();
        res.status(200).send(counts);
    }
    catch(err){
        console.log(err.message);
        res.status(401).send(err.message);
    }
}

module.exports={
    addDonor,
    getDonors,
    getFilteredDonors,
    removeDonor,
    updateDonor,
    countBloodGroups
}