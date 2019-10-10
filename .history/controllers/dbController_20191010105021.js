const {
    Client
} = require("pg");

require('dotenv/config')

// DB Connection
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
});


async function start() {
    await connect()
}

async function connect() {
    try {
        await client.connect()
    } catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function getContractors() {
    try {
        const results = await client.query(`SELECT * FROM tbl_contractors ORDER BY tbl_contractors."fullName"`)
        return results.rows
    } catch (e) {
        return []
    }
}

async function getBuildings() {
    try {
        const results = await client.query(`SELECT * FROM tbl_buildings ORDER BY tbl_buildings."address"`)
        return results.rows
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
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
    } catch (e) {
        return console.error('Error while adding new building')
    }

}

async function getContracorDetails(id) {
    try {
        let sql = `SELECT * FROM tbl_contractors WHERE tbl_contractors."idContractor"=${id}`
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about contractor')
    }
}

// Edit Contractor
async function editContractor(id, fullName, city, address) {
    try {
        let newConctractor = [id, fullName, city, address]
        let sql = `UPDATE tbl_contractors SET "fullName"='${newConctractor[1]}', "city"='${newConctractor[2]}', "address"='${newConctractor[3]}' WHERE "idContractor"=${newConctractor[0]}`
        const results = await client.query(sql)
    } catch (e) {
        return console.error('Error while editing contractor')
    }
}

async function deleteContractor(id) {
    try {
        let sql = `DELETE FROM tbl_contractors WHERE "idContractor"=${id}`
        const results = await client.query(sql)
    } catch (e) {
        return console.error('Error while deleting contractor')
    }
}

async function getBuildingDetails(id) {
    try {
        let sql = `SELECT * FROM tbl_buildings WHERE tbl_buildings."idBuildings"=${id}`
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about building')
    }
}

// Edit Building
async function editBuilding(id, city, address) {
    try {
        let newBuilding = [id, city, address]
        let sql = `UPDATE tbl_buildings SET "city"='${newBuilding[1]}', "address"='${newBuilding[2]}' WHERE "idBuildings"=${newBuilding[0]}`
        const results = await client.query(sql)
    } catch (e) {
        return console.error('Error while editing building')
    }
}

async function deleteBuilding(id) {
    try {
        let sql = `DELETE FROM tbl_buildings WHERE "idBuildings"=${id}`
        const results = await client.query(sql)
    } catch (e) {
        return console.error('Error while deleting building')
    }
}


async function getBookingForCurrentBuilding(id) {
    try {
        let sql = `SELECT tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate",
                tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
                FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor"
                INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
                WHERE tbl_buildings."idBuildings"=${idBuilding}`
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about building')
    }
}

async function getBookingForCurrentBuilding(id) {
    try {
        let sql = ``
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about building')
    }
}

async function getContractorsOrderedForSelectedPeriod(fromDate, toDate) {
    try {
        let sql = `SELECT tbl_bookings."idBookings", tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate",
            tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
            FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor"
            INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
            WHERE
            (tbl_bookings."fromDate"<'${fromDate}' AND tbl_bookings."toDate">'${toDate}')
            OR (tbl_bookings."fromDate"<'${fromDate}' AND tbl_bookings."toDate">'${fromDate}')
            OR (tbl_bookings."fromDate"<'${toDate}' AND tbl_bookings."toDate">'${toDate}')
            OR (tbl_bookings."fromDate"='${fromDate}' AND tbl_bookings."toDate"='${toDate}')
            OR ((tbl_bookings."fromDate">'${fromDate}' AND tbl_bookings."fromDate"<'${toDate}') AND tbl_bookings."toDate">'${toDate}')
            ORDER BY tbl_bookings."idBookings", tbl_contractors."idContractor"`
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about building')
    }
}

async function getBookingForCurrentBuilding(id) {
    try {
        let sql = ``
        const result = await client.query(sql)
        return result.rows
    } catch (e) {
        return console.error('Error while retrieving info about building')
    }
}

async function getBookingForCurrentBuilding(id) {
        try {
            let sql = ``
            const result = await client.query(sql)
            return result.rows
        } catch (e) {
            return console.error('Error while retrieving info about building')
        }
    }


    --Available
sql = `SELECT tbl_bookings."idBookings", tbl_contractors."idContractor", tbl_contractors."fullName", tbl_bookings."fromDate", tbl_bookings."toDate",
         tbl_buildings."idBuildings", tbl_buildings."city", tbl_buildings."address"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor"
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
         WHERE (tbl_bookings."fromDate">='${fromDate}' AND tbl_bookings."fromDate">'${toDate}')
         OR ((tbl_bookings."toDate"<'${fromDate}' OR tbl_bookings."toDate"='${fromDate}') AND tbl_bookings."toDate" <'${toDate}')
          ORDER BY tbl_bookings."idBookings", tbl_contractors."idContractor"`

    --Available distinct
sql = `SELECT DISTINCT tbl_contractors."idContractor", tbl_contractors."fullName"
         FROM tbl_contractors INNER JOIN tbl_bookings ON tbl_contractors."idContractor" = tbl_bookings."idContractor"
         INNER JOIN tbl_buildings ON tbl_bookings."idBuilding" = tbl_buildings."idBuildings"
         WHERE (tbl_bookings."fromDate">='${fromDate}' AND tbl_bookings."fromDate">'${toDate}')
         OR ((tbl_bookings."toDate"<'${fromDate}' OR tbl_bookings."toDate"='${fromDate}') AND tbl_bookings."toDate" <'${toDate}')
         ORDER BY tbl_contractors."idContractor"`









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
module.exports.deleteContractor = deleteContractor
module.exports.getBuildingDetails = getBuildingDetails
module.exports.editBuilding = editBuilding
module.exports.deleteBuilding = deleteBuilding