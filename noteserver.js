// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API Calls
// =============================================================
// Get Notes
app.get("/api/notes", function(req, res) {
  const read = fs.readFileSync('./db/db.json', { encoding: 'utf8' });
  res.json(read)
});

// Post Notes (Check to see that .post is usable)
app.post("/api/notes", function(req, res) {
  // recieve new note and save to db.json
  // return new db.json
});


// Delete Notes (Check to see that .delete is usable)
app.delete("/api/notes/:id", function(req, res) {
//  accept id number
// read for id number
// remove with specified id
// rewrite them to db.json
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// =============================================================


// Create New Notes Template^
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  console.log(newcharacter);

  // We then add the json the user sent to the character array
  characters.push(newcharacter);

  // We then display the JSON to the users
  res.json(newcharacter);
});