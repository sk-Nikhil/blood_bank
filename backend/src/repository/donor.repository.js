const Donor = require('../models/donors.js');

async function addDonor(donor){
    try{
        await donor.save();
        return donor.name;
    }
    catch(e){
        throw Error(err);
    }
}

async function getTotalDonors(){
    try{
        return await Donor.countDocuments();
    }
    catch(err){
        throw Error(err);
    }
}

async function getDonors(skip, limit){
    try{
        return await Donor.find().sort({_id:-1}).skip(skip).limit(limit);
    }
    catch(err){
        throw Error(err);
    }
}

async function getFilteredDonors(searchQuery, skip, limit){
    try{
        return await Donor.find(searchQuery).skip(skip).limit(limit);
    }
    catch(err){
        throw Error(err);
    }
}

async function removeDonor(id){
    try{
        return await Donor.findOneAndDelete({id:id});
    }
    catch(err){
        throw Error(err);
    }
}

async function updateDonor(id, address, contact, last_donated){
    try{
        return await Donor.findOneAndUpdate({id},{address, contact, last_donated});
    }
    catch(err){
        throw Error(err);
    }
}

async function countBloodGroups(){
    try{
        const counts = await Donor.aggregate([
            {
              $group: {
                _id: `$${Donor.blood_group}`,
                count: { $sum: 1 },
              },
            },
          ]);
        console.log(counts)
    }
    catch(err){
        console.log(err.message)
        throw Error(err)
    }
}


module.exports={ 
    addDonor,
    getTotalDonors,
    getDonors,
    getFilteredDonors,
    removeDonor,
    updateDonor,
    countBloodGroups
}