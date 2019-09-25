const express = require('express')
const path = require("path");
const exphbs = require("express-handlebars");
const session = require('express-session')
const bodyParser = require('body-parser')
const { Client } = require("pg");
const app = express()

// Load routes
const contractors = require("./routes/contractors")
const buildings = require("./routes/buildings")
const bookings = require("./routes/bookings")

// DB Connection
const client = new Client({
    user: "grzegorzlasz_buildingAgencyDB",
    password: "Qwerty2019",
    host: "grzegorzlasz.nazwa.pl",
    database: "grzegorzlasz_buildingAgencyDB"
});


// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })) // Main page view layout which contains other views
app.set('view engine', 'handlebars')

// Body-parser middleware - to get access to body (req.body)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Express session midleware
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))


//Routes
const top5_1 = ['constructor1', 'constructor2', 'constructor3', 'constructor4', 'constructor5'];
const top5_2 = ['constructor_2_1', 'constructor_2_2', 'constructor_2_3', 'constructor_2_4', 'constructor_2_5'];
const top5_3 = ['building1', 'building2', 'building3', 'building4', 'building5'];
// Index Route
app.get("/", (req, res) => {
    res.render("index", { top5_1: top5_1, top5_2: top5_2, top5_3: top5_3 })
})




app.get("/contractors", async (req, res) => {
    const rows = await readTodos()
    res.setHeader("content-type", "application/json") //info dla przegladarki ze przeslana odpowiedz jest w formacie JSON
    res.send(JSON.stringify(rows))
});




// Use Routes
app.use("/contractors", contractors)
app.use("/buildings", buildings)
app.use("/bookings", bookings)


app.listen(3000, () => {
    console.log(`Server started on port 3000`)
})



// FUNCTIONS?!
start()
async function start() {
    await connect()
    const contractors = await readContracotrs()
    console.log(contractors)
}


async function connect() {
    try {
        await client.connect()
    }
    catch (e) {
        console.error(`Failed to connect ${e}`)
    }
}

async function readContracotrs() {
    try {
        const results = await client.query("SELECT * FROM tbl_contractors")
        return results.rows
    }
    catch (e) {
        return []
    }
}