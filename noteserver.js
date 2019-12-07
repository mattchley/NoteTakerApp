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

// Post Notes
app.post("/api/notes", function(req, res) {
  // works, but needs to accept the new content from field
  // var json = JSON.stringify(note);
  const write = fs.appendFileSync('./db/db.json',{ encoding: 'utf8' })

  res.json(write)
});


// Delete Notes
app.delete("/api/notes/:id", function(req, res) {
  
// //  accept id number
// var chosen = req.params.id;
// // read for id number
// const readID = fs.readFileSync('./db/db.json', { encoding: 'utf8' });
// // remove with specified id
// return res.json()
// // rewrite them to db.json
// return res.json(false);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
// =============================================================


//Next steps
// connect the index.js functionality to the html
  // it appears that there arent some elements for the JS to connect to on the html

// with ID templating on db.json
[{"title":"Test Title","text":"Test text", "id":"1"}]