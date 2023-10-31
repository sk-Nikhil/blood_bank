const Donor = require("../models/donors.js");

async function addDonor(donor) {
  try {
    await donor.save();
    return donor.name;
  }
  catch (err) {
    throw Error(err);
  }
};

function getSearchQuery(query){
  return {
    $or: [
      { name: { $regex: query.searchTerm, $options: 'i' } },
      { bloodGroup: { $regex: query.searchTerm, $options: 'i' } },
      { address: { $regex: query.searchTerm, $options: 'i' } },
      { contact: { $regex: query.searchTerm, $options: 'i' } },
      { lastDonated: { $regex: query.searchTerm, $options: 'i' } },
    ],
  }
}
async function getTotalDonors(query) {
  const searchQuery = getSearchQuery(query);
  try {
    if (query.searchTerm !== '') {
      return await Donor.find(searchQuery).countDocuments();
    }
    return await Donor.countDocuments();
  }
  catch (err) {
    throw Error(err);
  }
};

async function getDonors(skip, limit, query) {
  const searchQuery = getSearchQuery(query)
  try {
    if (query.searchTerm !== '') {
      return await Donor.find(searchQuery).skip(skip).limit(limit);
    }
    else {
      return await Donor.find().sort({ _id: -1 }).skip(skip).limit(limit);
    }
  }
  catch (err) {
    throw Error(err);
  }
};


async function removeDonor(id) {
  try {
    return await Donor.findOneAndDelete({ _id: id });
  }
  catch (err) {
    throw Error(err);
  }
};

async function updateDonor(_id, address, contact, lastDonated) {
  try {
    return await Donor.findOneAndUpdate(
      { _id },
      { address, contact, lastDonated }
    );
  }
  catch (err) {
    throw Error(err);
  }
};

// for piechart data
async function countDistinctBloodGroups() {
  try {
    const result = await Donor.aggregate([
      {
        $group: {
          _id: '$bloodGroup',
          count: { $sum: 1 }
        }
      }
    ]);
    return result;
  }
  catch (err) {
    throw Error(err);
  }
};

module.exports = {
  addDonor,
  getTotalDonors,
  getDonors,
  removeDonor,
  updateDonor,
  countDistinctBloodGroups,
};
