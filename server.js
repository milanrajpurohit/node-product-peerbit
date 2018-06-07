/****************************
 SERVER MAIN FILE
 ****************************/

// Include Modules
const config = require('./configs/configs');
const mongoose = require('./configs/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// =======   Settings for CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Calling db connection file and get connecting
db = mongoose();

// =======   Routing
require('./app/routes/UserRoutes.js')(app, express);
require('./app/routes/ProductRoutes.js')(app, express);

// Listening Server
app.listen(config.serverPort , () => {
	console.log(`Server running at http://localhost:${config.serverPort}`);
});
