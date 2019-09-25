const { Client } = require("pg");


// DB Connection
const client = new Client({
    user: "grzegorzlasz_buildingAgencyDB",
    password: "Qwerty2019",
    host: "grzegorzlasz.nazwa.pl",
    database: "grzegorzlasz_buildingAgencyDB"
});

async function start() {
    await connect()
}

async function connect() {
    try {
        await client.connect()
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function getContracotrs() {
    try {
        const results = await client.query("SELECT * FROM tbl_contractors")
        return results.rows
    }
    catch (e) {
        return []
    }
}

async function getBuildings() {
    try {
        const results = await client.query("SELECT * FROM tbl_buildings")
        return results.rows
    }
    catch (e) {
        return []
    }
}

async function getBookings() {
    try {
        let sql = `SELECT tbl_bookings."toDate",
        tbl_bookings."fromDate",
        tbl_buildings.city,
        tbl_buildings.address,
        tbl_contractors.city AS public_tbl_contractors_city2,
        tbl_contractors.address AS public_tbl_contractors_address2,
        tbl_contractors."fullName"
       FROM tbl_bookings
         JOIN tbl_contractors ON tbl_bookings."idContractor" = tbl_contractors."idContractor"
         JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"`

        const results = await client.query(sql)
        //console.log(results.rows[1].fullname)
        return results.rows
    }
    catch (e) {
        return []
    }
}

module.exports.start = start
module.exports.connect = connect
module.exports.getContracotrs = getContracotrs
module.exports.getBuildings = getBuildings
module.exports.getBookings = getBookings
