const express = require('express')
const router = express.Router()
const dbfunctions = require('../dbFunctions/dbfunctions')

// Index Page
router.get("/buildings", async (req, res) => {
    const buildings = await dbfunctions.getBuildings()
    res.render("buildings/index", { buildings: buildings })
});

// Add building
router.get("/add", (req, res) => {
    res.render("buildings/add")
})

module.exports = router

