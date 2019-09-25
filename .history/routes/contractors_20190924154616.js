const express = require('express')
const router = express.Router()

// Index Page
router.get("/", (req, res) => {
    res.render("contractors/index")
})


// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router