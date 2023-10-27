const express = require('express');
const router = new express.Router();
const donorController = require('../controller/donors.controllers.js');
const verifyToken = require('../middleware/verifyAdminToken.js')

router.post('/addDonor',verifyToken, donorController.addDonor);
router.get('/getDonors', verifyToken, donorController.getDonors);
router.get('/filterSearch/:searchTerm',verifyToken,  donorController.getFilteredDonors);
router.delete('/removeDonor/:id',verifyToken, donorController.removeDonor);
router.patch('/updateDonor',verifyToken, donorController.updateDonor);
router.get('/countBloodGroups', donorController.countBloodGroups);

module.exports = router;