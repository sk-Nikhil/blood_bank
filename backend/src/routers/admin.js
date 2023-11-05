const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controllers.js');

router.get('/getAllEnquiries', adminController.getAllEnquiries);        //no need of validation as it is not based on any input
router.put('/enquiry', adminController.updateEnquiry);

// to be used
router.get('/getTotalPendingEnquiries', adminController.getTotalPendingEnquiries);
router.get('/getPendingEnquiries', adminController.getPendingEnquiries);

module.exports = router;