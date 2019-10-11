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

    res.render("bookings/addEmptyForm", {
        buildings: buildings
    })

})

router.post("/add", async (req, res) => {

    const contractors = await db.getAvailableContractors(req.body.startDate, req.body.endDate)

    // req.body.selectBuilding
    // req.body.selectContractor

    // res.send(req.body)

    if (contractors) {
        res.render("bookings/addEmptyForm", {
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