const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const bookings = await db.getBookings()
    res.render("bookings/index", { bookings: bookings })
});


// Add booking
router.get("/add", (req, res) => {
    const buildings = await db.getBuildings()
    res.render("bookings/add", { buildings: buildings })
})

module.exports = router