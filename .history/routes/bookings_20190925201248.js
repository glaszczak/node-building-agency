const express = require('express');
const router = express.Router();
const dbfunctions = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const bookings = await dbfunctions.getBookings()
    res.render("bookings/index", { bookings: bookings })
});


// Add booking
router.get("/add", (req, res) => {
    res.render("bookings/add")
})

module.exports = router