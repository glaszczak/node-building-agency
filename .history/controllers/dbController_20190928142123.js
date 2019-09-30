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

async function getContractors() {
    try {
        const results = await client.query(`SELECT * FROM tbl_contractors ORDER BY tbl_contractors."fullName"`)
        return results.rows
    }
    catch (e) {
        return []
    }
}

async function getBuildings() {
    try {
        const results = await client.query(`SELECT * FROM tbl_buildings ORDER BY tbl_buildings."address"`)
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
            JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
            ORDER BY tbl_buildings."address"`

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
        let sql = `SELECT tbl_contractors."fullName",
        COUNT(tbl_bookings."idContractor") AS sumOfContractors
        FROM tbl_bookings
        JOIN tbl_contractors ON tbl_bookings."idContractor" = tbl_contractors."idContractor"
        GROUP BY  tbl_contractors."fullName", tbl_bookings."idContractor" ORDER BY sumOfContractors DESC LIMIT 5`
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
        let sql = `SELECT
        tbl_contractors."fullName",
        COUNT(tbl_bookings."fromDate") AS sumOfContractors
        FROM tbl_bookings
        JOIN tbl_contractors ON tbl_bookings."idContractor" = tbl_contractors."idContractor"
        WHERE tbl_bookings."fromDate" > now()
        GROUP BY tbl_contractors."fullName"
        ORDER BY sumOfContractors DESC LIMIT 5`
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
        let sql = `SELECT
        tbl_buildings."address",
        COUNT(tbl_bookings."idBuilding") AS sumofbuildings
        FROM tbl_bookings
        JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
        WHERE tbl_bookings."fromDate" > now()
        GROUP BY tbl_bookings."idBuilding",tbl_buildings."address"
        ORDER BY sumofbuildings DESC LIMIT 5`
        const results = await client.query(sql)
        return results.rows
    }
    catch (e) {
        return []
    }
}

// Add New Contractor
async function addNewContractor(fullName, city, address) {
    //console.log(fullName, city, address)
    try {
        let newConctractor = [fullName, city, address]
        let sql = 'INSERT INTO tbl_contractors ("fullName", "city", "address") VALUES($1, $2, $3) RETURNING *'
        const results = await client.query(sql, newConctractor)
    }
    catch (e) {
        return console.error('Error while adding new contractor')
    }
}

// Add New Building
async function addNewBuilding(city, address) {
    //console.log(fullName, city, address)
    try {
        let newBuilding = [city, address]
        let sql = 'INSERT INTO tbl_buildings ("city", "address") VALUES($1, $2) RETURNING *'
        const results = await client.query(sql, newBuilding)
    }
    catch (e) {
        return console.error('Error while adding new building')
    }

}

async function getContracorDetails(id) {
    try {
        let sql = `SELECT * FROM tbl_contractors WHERE tbl_contractors."idContractor"=${id}`
        const result = await client.query(sql)
        return result.rows
    }
    catch (e) {
        return console.error('Error while retrieving info about contractor')
    }
}

// Edit Contractor
async function editContractor(fullName, city, address) {
    //console.log(fullName, city, address)
    try {
        let newConctractor = [id, fullName, city, address]
        console.log(newConctractor)
        //let sql = 'UPDATE tbl_contractors SET "fullName"=$2, "city"=$3, "address"=$4 WHERE "idContractor"=$1'
        //const results = await client.query(sql, newConctractor)
    }
    catch (e) {
        return console.error('Error while editing contractor')
    }
}
editContractor


module.exports.start = start
module.exports.connect = connect
module.exports.getContractors = getContractors
module.exports.getBuildings = getBuildings
module.exports.getBookings = getBookings
module.exports.getTopFiveContractorsAll = getTopFiveContractorsAll
module.exports.getTopFiveContractorsUpcoming = getTopFiveContractorsUpcoming
module.exports.getTopFiveBuildingsUpcoming = getTopFiveBuildingsUpcoming
module.exports.addNewContractor = addNewContractor
module.exports.addNewBuilding = addNewBuilding
module.exports.getContracorDetails = getContracorDetails
module.exports.editContractor = editContractor
