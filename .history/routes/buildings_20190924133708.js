const express = require('express')
const router = express.Router()

// Index Page
router.get("/", (req, res) => {
    res.render("buildings/index")
})

// Add building
router.get("add", (req, res) => {
    res.render("buildings/add")
})

module.exports = router