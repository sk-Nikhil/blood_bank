const Joi = require("joi");
const sanitizeContent = require('./sanitizeContent');

function addDonorValidation(req,res,next){
    const schema = Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
                "string.pattern.base":
                    "Name should not contain numbers or special characters",
            }),
        bloodGroup: Joi.string().trim().min(2).required(),
        address: Joi.string().trim().min(3).required(),
        contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
        lastDonated: Joi.string().trim().min(10).required(),
    });

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }
    next();
}

function removeDonorValidation(req,res,next){
    const schema = Joi.object().keys({
        id: Joi.string().trim().length(24).alphanum().required(),
    });

    if (schema.validate(req.params).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }
    next();
}

function updateDonorValidation(req,res,next){
    // donor record is updated by _id which is passed down using req.params and data to be updated is passed down using req.body
    // checks validation in params passed down
    const paramValidation = Joi.object().keys({
        _id: Joi.string().alphanum().required(),
    })
    if(paramValidation.validate(req.params).error){
        console.log(paramValidation.validate(req.params).error.details);
        return res.status(422).send({ error: paramValidation.validate(req.params).error.details }); //if any validation error
    }

    // checks validation in body
    const schema = Joi.object().keys({
        address: Joi.string().trim().min(3).required(),
        contact: Joi.number().integer().min(1000000000).max(9999999999).required(),
    });

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details }); //if any validation error
    }
    next();
}

function getDonorsValidation(req,res,next){
    const schema = Joi.object().keys({
        page:Joi.string().required(),
        // this will validate even if search term is empty
        // if search term is empty it will fetch donors records
        // if search term will be present it will filter out donors based on searchTerm

        searchTerm: Joi.string().alphanum().allow('', null).custom(sanitizeContent)
    })

    if (schema.validate(req.query).error) {
        console.log(schema.validate(req.query).error.details);
        return res.status(422).send({error:schema.validate(req.query).error.details});
    }
    next();
}

module.exports = {
    addDonorValidation,
    removeDonorValidation,
    updateDonorValidation,
    getDonorsValidation
}