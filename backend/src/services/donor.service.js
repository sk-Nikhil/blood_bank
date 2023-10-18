const donorRepository = require('../repository/donor.repository.js')
const Donor = require('../models/donors.js');

async function addDonor(userData){
    let id;
    const donorId = await donorRepository.getDonorById();
    if(!donorId || donorId.length === 0)
        id = 1;
    else
        id = donorId[0].id + 1;

    const donor = new Donor({
        id:id,...userData
    });
    return await donorRepository.addDonor(donor);
}


async function getDonors(page){
    const limit =5;
    const skip = (page - 1) * limit;

    const totalDonors = await donorRepository.getTotalDonors();
    const donors = await donorRepository.getDonors(skip, limit);

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

    let searchIdquery = '';
    if(+searchTerm){
        this.searchIdquery = +searchTerm;
    }
    const searchQuery = {
        $or: [
            { id: { $eq: this.searchIdquery} },
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
        currentPage: page,
        totalPages: Math.ceil(donors.length / limit)+1,
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