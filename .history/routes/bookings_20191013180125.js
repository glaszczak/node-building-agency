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

router.post("/add/", async (req, res) => {

    const contractors = await db.getAvailableContractors(req.body.startDate, req.body.endDate)

    res.render("bookings/add", {
        building: req.body.selectBuilding,
        contractors: contractors,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    })

})

router.post("/add/newBooking", async (req, res) => {
    const buildingId = db.getBuildingID(req.body.building)
    const contractorId = db.getContractorID(req.body.selectContractor)

    //await db.addNewBooking(buildingId, req.body.startDate, req.body.endDate, contractorId)

    await console.log(`building${buildingId}, contractor:${contractorId}`)
    res.send(buildingId)

    // res.redirect('/')

})


module.exports = router