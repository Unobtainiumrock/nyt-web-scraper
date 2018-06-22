
const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

// Start App
const app = express();
app.use(express.static('public'));

// Middleware
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({ defaultLayout: 'main' }));
app.set('view engine','handlebars');

// Connect to database
mongoose.connect("mongodb://localhost/echo-js", { promiseLibrary: bluebird });

// Routes
const homeRoute = require('./controllers/home');
const scrapeRoute = require('./controllers/scrape');
app.use(homeRoute);
app.use(scrapeRoute);


app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
