const express = require('express');
const router = new express.Router();
const userController = require('../controller/user.controller.js');
const userValidation = require('../middleware/validations/userValidation.js');  //validation middleware

router.post('/addEnquiry',userValidation.addEnquiryValidation, userController.addEnquiry);
router.get('/getEnquiries', userController.getEnquiries);

module.exports = router;