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

    await db.addNewBuilding(req.body.fullName, req.body.city, req.body.address)
    res.redirect('/buildings')
})

module.exports = router

