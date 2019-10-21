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

router.post("/add/newBooking", async (req, res) => {

    // await db.addNewBooking(req.body.selectBuilding, req.body.startDate, req.body.endDate, req.body.selectContractor)
    console.log(req.body)
    res.send(req.body.selectBuilding, req.body.startDate, req.body.endDate, req.body.selectContractor)

    // res.redirect('/')

})


module.exports = router