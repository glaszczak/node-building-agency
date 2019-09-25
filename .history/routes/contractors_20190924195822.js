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

app.get("/", (req, res) => {
    client
        .connect()
        .then(() => console.log("connected"))
        .then(() => client.query("SELECT * FROM tbl_contractors"))
        .then(results => res.render("contractors/index", { contractors: results.rows }))
        //.then(results => res.send(results.rows))
        .catch(e => console.log(e))
        .finally(() => client.end());
});



// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router