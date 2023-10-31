const express = require('express');
const router = express.Router();
const loginHelper = require('../helpers/login.js');
const loginValidation = require('../middleware/validations/loginValidation.js');

router.post('/login',loginValidation, loginHelper.login);

module.exports=router