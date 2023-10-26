const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controllers.js')

router.post('/login', adminController.login)
router.post('/signup', adminController.signup)

module.exports = router