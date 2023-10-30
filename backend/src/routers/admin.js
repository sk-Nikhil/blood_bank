const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controllers.js');

router.post('/login', adminController.login);
router.post('/signup', adminController.signup);
router.get('/getAllEnquiries', adminController.getAllEnquiries);
router.get('/getPendingEnquiries', adminController.getPendingEnquiries);
router.get('/getTotalPendingEnquiries', adminController.getTotalPendingEnquiries);

module.exports = router;