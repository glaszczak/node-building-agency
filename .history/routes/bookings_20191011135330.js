const express = require('express');
const router = express.Router();
const db = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const bookings = await db.getBookings()
    res.render("bookings/index", {
        bookings: bookings
    })
});


// Add booking
router.get("/add", async (req, res) => {
    const buildings = await db.getBuildings()

    const contractors = await db.getAvailableContractors('2019-10-01', '2019-10-08')

    if (contractors) {
        res.render("bookings/add", {
            buildings: buildings,
            contractors: contractors
        })
    } else {
        res.render("bookings/add", {
            buildings: buildings
        })
    }

})

module.exports = router