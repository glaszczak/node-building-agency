const express = require('express')
const path = require("path");
const exphbs = require("express-handlebars");
const session = require('express-session')
const bodyParser = require('body-parser')
const { Client } = require("pg");
const app = express()
const db = require('./controllers/dbController')
const Handlebars = require('handlebars')

// Load routes
const contractors = require("./routes/contractors")
const buildings = require("./routes/buildings")
const bookings = require("./routes/bookings")

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })) // Main page view layout which contains other views
app.set('view engine', 'handlebars')
Handlebars.registerHelper('dateFormat', require('handlebars-dateformat')) // To format date

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
// Index Route
app.get("/", async (req, res) => {
    const top5_1 = await db.getTopFiveContractorsAll()
    const top5_2 = await db.getTopFiveContractorsUpcoming()
    const top5_3 = await db.getTopFiveBuildingsUpcoming()
    res.render("index", { top5_1: top5_1, top5_2: top5_2, top5_3: top5_3 })
})

// Use Routes
app.use("/contractors", contractors)
app.use("/buildings", buildings)
app.use("/bookings", bookings)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

// Start db connection
db.start()