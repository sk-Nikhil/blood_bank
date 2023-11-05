const express = require('express');
const router = new express.Router();
const userController = require('../controller/user.controller.js');
const userValidation = require('../middleware/validations/userValidation.js');  //validation middleware
const verifyToken = require('../middleware/verifyUserToken.js');

router.get('/', verifyToken, (req,res)=>{
    res.send()
})
router.post('/signup',userValidation.signupValidation, userController.signup)
router.post('/addEnquiry', verifyToken, userValidation.addEnquiryValidation, userController.addEnquiry);
router.get('/getEnquiries', userController.getEnquiries);

module.exports = router;