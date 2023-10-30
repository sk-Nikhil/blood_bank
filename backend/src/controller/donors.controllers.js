const donorService = require("../services/donor.service.js");
const Joi = require("joi");

async function addDonor(req, res) {
    // Joi validation
    const schema = Joi.object().keys({
        name: Joi.string()
            .regex(/^[a-zA-Z]+$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Name should not contain numbers or special characters",
            }),
        bloodGroup: Joi.string().required(),
        address: Joi.string().required(),
        contact: Joi.number().required(),
        lastDonated: Joi.string().required(),
    });

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }

    try {
        const name = await donorService.addDonor(req.body);
        res.status(200).send({ data: `Donor ${name} added successfully` });
    } catch (err) {
        res.status(401).send({ error: err.message });
    }
}

async function getDonors(req, res) {
    try {
        const donor = await donorService.getDonors(req.query);
        res.status(200).send(donor);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
}

async function removeDonor(req, res) {
    const schema = Joi.object().keys({
        id: Joi.string().alphanum().required(),
    });

    if (schema.validate(req.params).error) {
        console.log(schema.validate(req.body).error.details);
        return res.status(422).send({ error: schema.validate(req.body).error.details });
    }
    try {
        const donorName = await donorService.removeDonor(req.params.id);
        res.status(200).send({ data: `donor ${donorName} is removed successfully` });
    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function updateDonor(req, res) {
    // validation, only thhese should be present in body
    const schema = Joi.object().keys({
        _id: Joi.string().alphanum().required(),
        address: Joi.string().required(),
        contact: Joi.number().required(),
    });

    if (schema.validate(req.body).error) {
        console.log(schema.validate(req.body).error.details);
        return res
            .status(422)
            .send({ error: schema.validate(req.body).error.details }); //if any validation error
    }

    try {
        await donorService.updateDonor(req.body);
        res
            .status(200)
            .send({ data: "donor details has been updated successfully" }); //if success
    } catch (err) {
        console.log(err.message);
        res.status(401).send(err.message); //if any error occurs
    }
}

async function countBloodGroups(req, res) {
    try {
        const counts = await donorService.countBloodGroups();
        res.status(200).send(counts);
    } catch (err) {
        console.log(err.message);
        res.status(401).send(err.message);
    }
}

module.exports = {
    addDonor,
    getDonors,
    removeDonor,
    updateDonor,
    countBloodGroups,
};
