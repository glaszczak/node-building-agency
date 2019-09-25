const express = require('express')
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser')

const app = express()

// Load routes

// DB config

// Connect do DB

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set('viewengine', "handlebars")