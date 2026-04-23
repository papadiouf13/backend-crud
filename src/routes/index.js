
const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const prodRoutes  = require('./productRoutes');


router.use('/auth',    authRoutes);
router.use('/products', prodRoutes);


module.exports = router;
