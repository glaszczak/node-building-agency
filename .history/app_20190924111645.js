const express = require('express')
const exphbs = require("express-handlebars");
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()

// Load routes

// DB config

// Connect do DB

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })) // Main page view layout which contains other views
app.set('view engine', 'handlebars')

// Body-parser middleware - to get access to body (req.body)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express session midleware
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

// Index Route
app.get("/", (req, res) => {
    const title = "App Tab";
    res.render("index", { title: title })
})


// User Routes


app.listen(3000, () => {
    console.log(`Server started on port 3000`)
})