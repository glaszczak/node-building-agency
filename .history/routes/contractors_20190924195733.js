const express = require('express')
const router = express.Router()

// Index Page
router.get("/", (req, res) => {
    res.render("contractors/index")
})

app.get("/contractors", (req, res) => {
    client
        .connect()
        .then(() => console.log("connected"))
        .then(() => client.query("SELECT * FROM tbl_contractors"))
        .then(results => res.render("index", { contractors: results.rows }))
        //.then(results => res.send(results.rows))
        .catch(e => console.log(e))
        .finally(() => client.end());
});



// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router