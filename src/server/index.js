// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server
app.listen(9090, function () {
  console.log("Production listening on port 9090!");
});

app.listen(9000, function () {
  console.log("Development listening on port 9000!");
});

// Respond with JS object when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/addData", addData);

function addData(req, res) {
  projectData["lat"] = req.body.lat;
  projectData["lon"] = req.body.lon;
  projectData["countryName"] = req.body.countryName;
  projectData["tripLength"] = req.body.tripLength;
  res.send(projectData);
}

app.get("/all", getAll);

function getAll(req, res) {
  res.send(projectData);
}
