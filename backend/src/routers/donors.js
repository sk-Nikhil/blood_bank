const express = require('express');
const router = new express.Router();
const donorController = require('../controller/donors.controllers.js');

router.post('/addDonor', donorController.addDonor);
router.get('/getDonors', donorController.getDonors);
router.get('/filterSearch/:searchTerm', donorController.getFilteredDonors);
router.delete('/removeDonor/:id', donorController.removeDonor);
router.patch('/updateDonor', donorController.updateDonor);
router.get('/countBloodGroups', donorController.countBloodGroups);

module.exports = router;