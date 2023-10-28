const express = require('express');
const router = new express.Router();
const userController = require('../controller/user.controller.js');

router.post('/addEnquiry', userController.addEnquiry);
router.get('/getEnquiries', userController.getEnquiries)

module.exports = router;