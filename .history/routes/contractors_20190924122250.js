const express = require('express')
const router = express.Router()

// Index Page
router.get("/", (req, res) => {
    //res.render("contractors/index")
    res.send("done")

})

module.export = router