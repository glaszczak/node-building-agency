const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const bookings = await db.getBookings()
    res.render("bookings/index", { bookings: bookings })
});


// Add booking
router.get("/add", async (req, res) => {
    const buildings = await db.getBuildings()
    const contractors = await db.getContracotrs()
    console.log(contractors)
    res.render("bookings/add", { buildings: buildings, contractors: contractors })
})

module.exports = router