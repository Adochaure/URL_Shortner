const express = require('express');
const authcontroller = require('../controllers/auth.controller')
const router = express.Router();


//to create link
router.post("/create_url",authcontroller.CreateURL)
router.get("/urls", authcontroller.GetURLs)
router.delete("/urls/:id", authcontroller.DeleteURL)
router.get("/:shortCode", authcontroller.RedirectURL)


module.exports = router;
