const express = require('express')
const router = express.Router()
const db = require('../controllers/dbController')

// Index Page
router.get("/", async (req, res) => {
    const buildings = await db.getBuildings()
    res.render("buildings/index", { buildings: buildings })
});

// Add building
router.get("/add", async (req, res) => {
    res.render("buildings/add")
})

// Process Form
router.post("/", async (req, res) => {
    await db.addNewBuilding(req.body.city, req.body.address)
    res.redirect('/buildings')
})

// Edit Building Form
router.get("/edit/:id", async (req, res) => {
    const contractorDetails = await db.getContracorDetails(req.params.id)
    //console.log(contractorDetails[0])
    res.render("contractors/edit", { contractors: contractorDetails[0] })
})

// Process Form - edit existing
router.put("/edit/:id", async (req, res) => {
    await db.editContractor(req.params.id, req.body.fullName, req.body.city, req.body.address)
    res.redirect('/contractors')
})

// Delete Building
router.delete("/:id", async (req, res) => {
    await db.deleteBuilding(req.params.id)
    res.redirect('/buildings')
})
module.exports = router

