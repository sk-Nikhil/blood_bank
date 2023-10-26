const express = require('express');
const router = express.Router();

const donorRouter = require('./routers/donors.js')
const adminRouter = require('./routers/admin.js')

router.use(donorRouter);
router.use(adminRouter);

module.exports = router;