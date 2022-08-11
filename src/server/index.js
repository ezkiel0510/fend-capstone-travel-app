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

const port = 9090;

// Setup Server
app.listen(port, listening);

function listening() {
  console.log(`running on localhost: ${port}`);
}

// Respond with JS object when a GET request is made to the homepage
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

app.post("/addData", addData);

function addData(req, res) {
  projectData["date"] = req.body.date;
  projectData["temp"] = req.body.temp;
  projectData["feel"] = req.body.feel;
  res.send(projectData);
}

app.get("/all", getAll);

function getAll(req, res) {
  res.send(projectData);
}
