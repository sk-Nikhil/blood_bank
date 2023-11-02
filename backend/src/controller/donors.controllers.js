const donorService = require("../services/donor.service.js");

async function addDonor(req, res) {
    try {
        const donor = await donorService.addDonor(req.body);
        return res.status(200).send({ data: `Donor ${donor.name} added successfully`, id:donor.id });
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).send({ error: "your request to add donor has faild due to some internal errors" });
    }
}

async function getDonors(req, res) {
    try {
        const donor = await donorService.getDonors(req.query);
        return res.status(200).send(donor);
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
}

async function removeDonor(req, res) {
    try {
        const donorName = await donorService.removeDonor(req.params.id);
        return res.status(200).send({ data: `donor ${donorName} is removed successfully` });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({error:err.message});
    }
}

async function updateDonor(req, res) {
    try {
        await donorService.updateDonor(req.params,req.body);
        return res.status(200).send({ data: "donor details has been updated successfully" }); //if success
    } catch (err) {
        console.log(err.message);
        return res.status(500).send(err.message); //if any error occurs
    }
}

async function countDistinctBloodGroups(req, res) {
    try {
        const counts = await donorService.countDistinctBloodGroups();
        res.status(200).send(counts);
    } catch (err) {
        console.log(err.message);
        res.status(500).send({error:err.message});
    }
}

module.exports = {
    addDonor,
    getDonors,
    removeDonor,
    updateDonor,
    countDistinctBloodGroups,
};
