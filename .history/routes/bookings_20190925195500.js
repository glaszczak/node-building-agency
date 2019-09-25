const express = require('express');
const router = express.Router();
const dbfunctions = require('../dbFunctions/dbfunctions')


// Index Page
router.get("/", async (req, res) => {
    const bookings = await getBookings()
    res.render("bookings/index", { bookings: bookings })
});


// Add booking
router.get("/add", (req, res) => {
    res.render("bookings/add")
})

module.exports = router