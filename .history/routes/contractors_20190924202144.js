const express = require('express')
const router = express.Router()
const { Client } = require("pg");

// Index Page
/*
router.get("/", (req, res) => {
    res.render("contractors/index")
})
*/

//DB Connect
const client = new Client({
    user: "grzegorzlasz_buildingAgencyDB",
    password: "Qwerty2019",
    host: "grzegorzlasz.nazwa.pl",
    database: "grzegorzlasz_buildingAgencyDB"
});

router.get("/", (req, res) => {
    let contractors = []
    client
        .connect()
        .then(() => console.log("connected"))
        .then(() => client.query("SELECT * FROM tbl_contractors"))
        //.then(results => res.render("contractors/index", { contractors: results.rows }))
        //.then(results => res.send(results.rows))
        //.then(results => console.log(results.rows[1].city))
        .then(results => res.render("contractors/index", { contractors: results.rows }))
        .catch(e => console.log(e))
        .finally(() => client.end());
});



// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router