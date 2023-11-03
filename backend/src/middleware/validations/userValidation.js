const Joi = require("joi");
const sanitizeContent = require('./sanitizeContent');

function signupValidation(req, res, next) {
    console.log(req.body)
    const schema = Joi.object().keys({
        // name should only contains letters and not any numbers of special characterrs
        name: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
            'string.pattern.base': 'Name should not contain numbers or special characters',
        }),
        // [a-zA-Z0-9._%+-]+ it matches local part of email which can contain letters and certain special characters
        // [-a-zA-Z0-9.]+ it matches the domain part of the email address, it allows letters, digits, hyphen and periods
        // [a-zA-Z]{2,} this part matches top level domain, it requires at least two or more characters
        email: Joi.string().email().required().regex(/^[a-zA-Z0-9._%+-]+@[-a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/).custom(sanitizeContent),
        password:Joi.string().required().custom(sanitizeContent)
    })

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }

    next();
}

function addEnquiryValidation(req, res, next) {
    const schema = Joi.object().keys({
        // name should only contains letters and not any numbers of special characterrs
        name: Joi.string().regex(/^[a-zA-Z]+$/).required().messages({
            'string.pattern.base': 'Name should not contain numbers or special characters',
        }),
        // [a-zA-Z0-9._%+-]+ it matches local part of email which can contain letters and certain special characters
        // [-a-zA-Z0-9.]+ it matches the domain part of the email address, it allows letters, digits, hyphen and periods
        // [a-zA-Z]{2,} this part matches top level domain, it requires at least two or more characters
        email: Joi.string().email().required().regex(/^[a-zA-Z0-9._%+-]+@[-a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/).custom(sanitizeContent),
        bloodGroup: Joi.string().trim().min(2).required().custom(sanitizeContent),
        location: Joi.string().trim().min(10).required().custom(sanitizeContent),
        message: Joi.string().trim().min(15).required().custom(sanitizeContent)
    })

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }
    next();
}

module.exports = {
    addEnquiryValidation,
    signupValidation
}