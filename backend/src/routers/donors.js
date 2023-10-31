const express = require('express');
const router = new express.Router();
const donorController = require('../controller/donors.controllers.js');
const verifyToken = require('../middleware/verifyAdminToken.js');
const donorValidations = require('../middleware/validations/donorValidation.js');   //validation middleware

router.post('/donor',verifyToken,donorValidations.addDonorValidation, donorController.addDonor);                 //add donor
router.get('/donors', verifyToken, donorController.getDonors);                                                   //get all donors
router.delete('/donor/:id',verifyToken,donorValidations.removeDonorValidation, donorController.removeDonor);     //remove donor data using id
router.put('/donor/:_id',verifyToken,donorValidations.updateDonorValidation, donorController.updateDonor);       //update donor data
router.get('/countBloodGroups', donorController.countDistinctBloodGroups);                                       //count distinct blood groups

module.exports = router;