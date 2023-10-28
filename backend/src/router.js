const express = require('express');
const router = express.Router();

const donorRouter = require('./routers/donors.js');
const adminRouter = require('./routers/admin.js');
const userRouter = require('./routers/user.js');

router.use(donorRouter);
router.use(adminRouter);
router.use(userRouter);

module.exports = router;