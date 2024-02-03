const express = require('express');
const router = express.Router();
const { createListing ,deleteListing,updateListing} = require('../controllers/listing.controller.js');
const { verifyToken } = require('../utils/verifyUser.js');

router.post('/create',verifyToken,createListing);
router.delete('/delete/:id',verifyToken,deleteListing);
router.post('/update/:id',verifyToken,updateListing);

module.exports = router