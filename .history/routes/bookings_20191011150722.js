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

    res.render("bookings/add", {
        building: req.body.selectBuilding,
        contractors: contractors,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

})

router.post("/add/:id", async (req, res) => {

    const contractors = await db.getAvailableContractors(req.body.startDate, req.body.endDate)

    res.render("bookings/add", {
        building: req.body.selectBuilding,
        contractors: contractors,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        contractors: req.body.selectContractor
    })

})

await db.addNewContractor(req.body.fullName, req.body.city, req.body.address)

module.exports = router