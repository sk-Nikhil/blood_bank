const Joi = require("joi");
const sanitizeContent = require('./sanitizeContent');

function loginValidation(req, res, next) {
    const loginSchema = Joi.object().keys({
        // [a-zA-Z0-9._%+-]+ it matches local part of email which can contain letters and certain special characters
        // [-a-zA-Z0-9.]+ it matches the domain part of the email address, it allows letters, digits, hyphen and periods
        // [a-zA-Z]{2,} this part matches top level domain, it requires at least two or more characters
        username: Joi.string().email().required().regex(/^[a-zA-Z0-9._%+-]+@[-a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/).custom(sanitizeContent),
        password: Joi.string().custom(sanitizeContent)

    })
    if(loginSchema.validate(req.body).error) {
        console.log(loginSchema.validate(req.body).error.details);
        // sending custom error as user need not to know about validation error
        return res.status(422).send({ error: "Invalid username of password" });
    }
    next()
}

module.exports = loginValidation