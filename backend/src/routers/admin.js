const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controllers.js');

router.get('/getAllEnquiries', adminController.getAllEnquiries);
router.get('/getPendingEnquiries', adminController.getPendingEnquiries);
router.get('/getTotalPendingEnquiries', adminController.getTotalPendingEnquiries);

module.exports = router;