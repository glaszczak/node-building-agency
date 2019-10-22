const {
    Client
} = require("pg");

// DB Connection
const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE
});


async function getContractors() {
    try {
        const results = await client.query(`SELECT * FROM tbl_contractors ORDER BY tbl_contractors."fullName"`)
        return results.rows
    } catch (e) {
        return []
    }
}

async function getContractorID(contractorName) {
    try {
        const results = await client.query(`SELECT "idContractor" FROM tbl_contractors WHERE "fullName"='${contractorName}'`)
        return results.rows[0].idContractor
    } catch (e) {
        return []
    }
}

module.exports = {
    getContractors: getContractors,
    getContractorID: getContractorID
}