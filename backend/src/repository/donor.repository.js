const Donor = require("../models/donors.js");

async function addDonor(donor) {
  try {
    await donor.save();
    return donor.name;
  }
  catch (err) {
    console.log(err.message)
    throw Error(err);
  }
};

async function getTotalDonors() {
  try {
    return await Donor.countDocuments();
  }
  catch (err) {
    throw Error(err);
  }
};

async function getDonors(skip, limit, query) {
  const searchQuery = {
    $or: [
      { name: { $regex: query.searchTerm, $options: 'i' } },
      { bloodGroup: { $regex: query.searchTerm, $options: 'i' } },
      { address: { $regex: query.searchTerm, $options: 'i' } },
      { contact: { $regex: query.searchTerm, $options: 'i' } },
      { lastDonated: { $regex: query.searchTerm, $options: 'i' } },
    ],
  };
  console.log(query)
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

async function updateDonor(_id, address, contact, last_donated) {
  try {
    return await Donor.findOneAndUpdate(
      { _id },
      { address, contact, last_donated }
    );
  }
  catch (err) {
    throw Error(err);
  }
};

// for piechart data
async function countBloodGroups() {
  try {
    const result = await Donor.aggregate([
      {
        $group: {
          _id: '$blood_group',
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
  countBloodGroups,
};
