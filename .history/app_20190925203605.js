const express = require('express')
const path = require("path");
const exphbs = require("express-handlebars");
const session = require('express-session')
const bodyParser = require('body-parser')
const { Client } = require("pg");
const app = express()
const db = require('./controllers/dbController')
const Handlebars = require('handlebars')
const HandlebarsIntl = require('handlebars-intl')

// Load routes
const contractors = require("./routes/contractors")
const buildings = require("./routes/buildings")
const bookings = require("./routes/bookings")

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })) // Main page view layout which contains other views
app.set('view engine', 'handlebars')
HandlebarsIntl.registerWith(Handlebars)
//Handlebars.registerHelper('dateFormat', require('handlebars-dateformat'))

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

// Use Routes
app.use("/contractors", contractors)
app.use("/buildings", buildings)
app.use("/bookings", bookings)


app.listen(3000, () => {
    console.log(`Server started on port 3000`)
})

// Start db connection
db.start()