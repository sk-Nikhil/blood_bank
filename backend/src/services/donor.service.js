const donorRepository = require('../repository/donor.repository.js');
const Donor = require('../models/donors.js');

async function addDonor(userData){
    const donor = new Donor({
        ...userData
    });
    return await donorRepository.addDonor(donor);
}

async function getDonors(query){
    const page = parseInt(query.page) || 1;
    const limit =5;
    const skip = (page - 1) * limit;

    try{
        const totalDonors = await donorRepository.getTotalDonors();
        const donorsFound = await donorRepository.getDonors(skip, limit, query);
        const donors = {
            donorsFound, 
            currentPage: donorsFound.length === 0 ? 0 :page,
            totalPages: Math.ceil(totalDonors / limit),
        };
        return donors;
    }
    catch(err){
        return err
    }
};

async function removeDonor(id){
    const donor = await donorRepository.removeDonor(id);
    return donor.name;
};

async function updateDonor(donorData){
    const {_id, address, contact} = {...donorData};
    const d = new Date();
    const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return await donorRepository.updateDonor(_id, address, contact, last_donated);
};

async function countBloodGroups(){
    return await donorRepository.countBloodGroups();
};

module.exports = {
    addDonor,
    getDonors,
    removeDonor,
    updateDonor,
    countBloodGroups
};