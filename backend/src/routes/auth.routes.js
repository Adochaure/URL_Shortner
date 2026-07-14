const express = require('express');
const authcontroller = require('../controllers/auth.controller')
const router = express.Router();

router.post("/create_url",authcontroller.CreateURL)


module.exports = router;