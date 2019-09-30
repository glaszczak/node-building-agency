const express = require('express')
const router = express.Router()
const db = require('../controllers/dbController')


// Index Page
router.get("/", async (req, res) => {
    const contractors = await db.getContracotrs()
    res.render("contractors/index", { contractors: contractors })
});

// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

// Process Form
router.post("/", (req, res) => {
    console.log(req.body.title)
})

module.exports = router