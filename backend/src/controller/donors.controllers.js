const donorService = require('../services/donor.service.js');

async function addDonor(req,res){
    try{
        const name = await donorService.addDonor(req.body);
        res.status(200).send(`Donor ${name} added successfully`);
    }
    catch(err){
        res.status(401).send(err.message);
    }
}

async function getDonors(req,res){
    const page = parseInt(req.query.page) || 1;
    try {
        const donor = await donorService.getDonors(page);
        res.send(donor);
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
        res.send(donors);
    }
    catch(err) {
        console.log(err.message);
        res.status(401).send(err.message);
    }
}

async function removeDonor(req,res){
    try{
        const donor_name = await donorService.removeDonor(req.params.id);
        res.status(200).send(`donor ${donor_name} is removed successfully`);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send(err.message);
    }
}

async function updateDonor(req,res){
    try{
        await donorService.updateDonor(req.body);
        res.status(200).send("donor details has been updated successfully");
    }
    catch(err){
        console.log(err.message);
        res.status(401).send(err.message);
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