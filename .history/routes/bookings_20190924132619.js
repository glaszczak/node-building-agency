const express = require('express');
const router = express.Router();

// Index Page
router.get("/", (req, res) => {
    res.render("bookings/index")
})

// Add booking
router.get("/add", (req, res) => {
    res.render("bookings/add")
})

module.exports = router