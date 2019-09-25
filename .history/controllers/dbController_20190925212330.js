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
            tbl_buildings."city",
            tbl_buildings."address",
            tbl_contractors."city" AS public_tbl_contractors_city2,
            tbl_contractors."address" AS public_tbl_contractors_address2,
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

// To get TOP 5 Contractors - all bookings
async function getTopFiveContractorsAll() {
    try {
        let sql = `SELECT * FROM tbl_contractors LIMIT 5`
        const results = await client.query(sql)
        return results.rows
    }
    catch (e) {
        return []
    }
}

// To get TOP 5 Contractors - upcoming bookings
async function getTopFiveContractorsUpcoming() {
    try {
        let sql = `SELECT tbl_bookings."fromDate",
        tbl_buildings."address",
        tbl_contractors."fullName"
        FROM tbl_bookings
        JOIN tbl_contractors ON tbl_bookings."idContractor" = tbl_contractors."idContractor"
        JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
        WHERE tbl_bookings."fromDate" > now() LIMIT 5"`
        /*
                sql = `SELECT tbl_bookings."fromDate", tbl_contractors."fullName", tbl_buildings."address"
                FROM tbl_bookings
                JOIN tbl_contractors ON tbl_bookings."idContractor" = tbl_contractors."idContractor"
                JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
                WHERE tbl_bookings."fromDate" > now() LIMIT 5`
                */
        const results = await client.query(sql)
        return results.rows
    }
    catch (e) {
        return []
    }
}

// To get TOP 5 Buildings - upcoming bookings
async function getTopFiveBuildingsUpcoming() {
    try {
        let sql = `SELECT * FROM tbl_bookings WHERE "fromDate" > now() LIMIT 5`
        const results = await client.query(sql)
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
module.exports.getTopFiveContractorsAll = getTopFiveContractorsAll
module.exports.getTopFiveContractorsUpcoming = getTopFiveContractorsUpcoming
module.exports.getTopFiveBuildingsUpcoming = getTopFiveBuildingsUpcoming
