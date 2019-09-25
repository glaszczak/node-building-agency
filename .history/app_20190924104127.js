const express = require('express')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')

const app = express()

// Load routes

// DB config

// Connect do DB

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" })) // Main page view layout which contains other views
app.set('viewengine', 'handlebars')

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
    const title = "Application";
    res.send("welcome")
    //res.render()
})
