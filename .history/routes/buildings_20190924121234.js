const express = require('express')
const router = express.Router()

// Index Page
router.get("/", (req, res) => {
    res.render("buildings/index")
})

module.export = router