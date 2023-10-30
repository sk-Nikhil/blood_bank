const express = require('express');
const router = new express.Router();
const donorController = require('../controller/donors.controllers.js');
const verifyToken = require('../middleware/verifyAdminToken.js')

router.post('/donor',verifyToken, donorController.addDonor);
router.get('/donors', verifyToken, donorController.getDonors);
router.delete('/donor/:id',verifyToken, donorController.removeDonor);
router.put('/donor',verifyToken, donorController.updateDonor);
router.get('/countBloodGroups', donorController.countBloodGroups);

module.exports = router;