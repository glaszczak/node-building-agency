const express = require('express')
const router = express.Router()
const { Client } = require("pg");
const pg = require('pg')


// DB Config
let config = {
    user: "grzegorzlasz_buildingAgencyDB",
    password: "Qwerty2019",
    host: "grzegorzlasz.nazwa.pl",
    database: "grzegorzlasz_buildingAgencyDB",
    max: 10, // Max number of clients in the pool
    idleTimeoutMillis: 3000, // How long a client is allowed to remain idle before being closed (3sek)
}

// Initialize a connection pool
const pool = new pg.Pool(config)

/*
router.get("/", (req, res) => {
    pool.connect((err, client, done) => {
        if (err) {
            return console.error('error fetching client from pool', err)
        }
        client.query("SELECT * FROM tbl_contractors", (err, res) => {
            done()
            if (err) { return console.error('error running query', err) }
            console.log(res.rows[1].city)
            res.send(res.rows[1].city)
            //res.render("contractors/index", { contractors: res.rows })
        })
    })
})
*/


// Index Page
/*
router.get("/", (req, res) => {
    res.render("contractors/index")
})
*/

// Index Page
router.get("/", (req, res) => {
    let contractors = []
    pool
        .connect()
        .then(() => client.query("SELECT * FROM tbl_contractors"))
        .then(results => res.render("contractors/index", { contractors: results.rows }))
        .catch(e => console.log(e))
        .finally(() => pool.end());
});


/*
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
*/

// Add contractor
router.get("/add", (req, res) => {
    res.render("contractors/add")
})

module.exports = router