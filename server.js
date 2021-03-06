
const express = require('express');
const PORT = process.env.PORT || 8080;
const path = require('path');
const mongoose = require('mongoose');
const bluebird = require('bluebird');
const morganBody = require('morgan-body');

// Start App
const app = express();
app.use(express.static('public'));

// Middleware
const bodyParser = require('body-parser');
const logger = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
morganBody(app, {
  logReqDateTime: false,
  logReqUserAgent: false,
});

// Handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars',exphbs({ defaultLayout: 'main' }));
app.set('view engine','handlebars');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/echo-js", { promiseLibrary: bluebird });

// Routes
const filePaths = require('./controllers/');
filePaths.forEach(route => app.use(require(route)));


app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
