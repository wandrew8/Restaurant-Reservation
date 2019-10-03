// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var waitlist = [];
var tables = [
  {
    cutomerName: "Dandrew",
    phoneNumber: "205-555-5555",
    customerEmail: "blah@blah.com",
    customerID: "dandrew85"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays reservation, or returns false
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New tables - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTable = req.body;
  if (tables.length > 5) {
    console.log(newTable);
    waitlist.push(newTable);
    res.json(newTable);
  } else {
    console.log(newTable);
    tables.push(newTable);
    res.json(newTable);
  }
});

//Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
