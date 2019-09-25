const express = require('express')
const router = express.Router()
const dbfunctions = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const contractors = await dbfunctions.getContracotrs()
    res.render("contractors/index", { contractors: contractors })
});

// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router