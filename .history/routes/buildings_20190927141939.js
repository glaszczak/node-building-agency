const express = require('express')
const router = express.Router()
const db = require('../controllers/dbController')

// Index Page
router.get("/", async (req, res) => {
    const buildings = await db.getBuildings()
    res.render("buildings/index", { buildings: buildings })
});

// Add building
router.get("/add", (req, res) => {
    const buildings = await db.getBuildings()
    res.render("buildings/add", { buildings: buildings })
})

module.exports = router

