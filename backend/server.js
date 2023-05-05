//Packages
const express = require("express");
const cors = require("cors");
require("dotenv").config();


//Backend Application
const app = express();


app.use(cors());

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
var middleware = require('./middleware/middleware.js');
var serverRoutes = require('./routes/routes.js');
app.use('/', middleware.ignoreFavicon, serverRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listen on the port " + port);
});