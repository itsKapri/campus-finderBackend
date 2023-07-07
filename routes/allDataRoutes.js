const express = require('express');
const { getAllData } = require('../controllers/allDataController');
const router = express.Router();

router.get('/home', getAllData);

module.exports = router;
