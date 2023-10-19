const donorRepository = require('../repository/donor.repository.js')
const Donor = require('../models/donors.js');

async function addDonor(userData){
    const donor = new Donor({
        ...userData
    });
    return await donorRepository.addDonor(donor);
}


async function getDonors(page){
    const limit =5;
    const skip = (page - 1) * limit;

    const totalDonors = await donorRepository.getTotalDonors();
    const donors = await donorRepository.getDonors(skip, limit);
    if(donors.length === 0) {
        page=0
    }
    const donor = {
        donors, 
        currentPage: page,
        totalPages: Math.ceil(totalDonors / limit),
    }

    return donor;
}

async function getFilteredDonors(page, searchTerm){
    const limit =5;
    const skip = (page - 1) * limit;

    const searchQuery = {
        $or: [
            { id: { $regex: searchTerm, $options:'i' } },
            { name: { $regex: searchTerm, $options:'i' } },
            { blood_group: { $regex: searchTerm, $options:'i' } },
            { address: { $regex: searchTerm, $options:'i' } },
            { contact: { $regex: searchTerm, $options:'i' } },
            { last_donated: { $regex: searchTerm, $options:'i' } },
        ],
    }

    const donors = await donorRepository.getFilteredDonors(searchQuery, skip, limit);
    const donor = {
        donors, 
        currentPage: 1,
        totalPages: Math.ceil(donors.length / limit),
    }

    return donor;
}

async function removeDonor(id){
    const donor = await donorRepository.removeDonor(id);
    return donor.name;
}

async function updateDonor(donorData){
    const {id, address, contact} = {...donorData};
    const d = new Date();
    const last_donated = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;

    return await donorRepository.updateDonor(id, address, contact, last_donated);
}

module.exports = {
    addDonor,
    getDonors,
    getFilteredDonors,
    removeDonor,
    updateDonor
}