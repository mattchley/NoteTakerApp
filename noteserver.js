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
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./public/index.html"));
// });

// API Calls
// =============================================================
// Get Notes
app.get("/api/notes", function (req, res) {
  fs.readFile('./db/db.json', (err, data) => {
    if (err) throw err;
    let read = JSON.parse(data);
    res.json(read)
  });
});

// Post Notes
// posts correctly but does not keep previous posts?
app.post("/api/notes", function (req, res) {
  var note = req.body;
  var notes = fs.readFile('./db/db.json', {'flags': 'a'},function (err) {
    if (err) throw err
    let parsedNotes;
    // If notes isn't an array or can't be turned into one, send back a new empty array
    try {
      parsedNotes = [].concat(JSON.parse(notes));
    } catch (err) {
      parsedNotes = [];
    }
    parsedNotes.push(note)
    fs.writeFile('./db/db.json', JSON.stringify(parsedNotes), function (err) {
      if (err) throw err
      res.json(note)
    })
  });
});


// Delete Notes
app.delete("/api/notes/:id", function (req, res) {
// on the website it posts the title on the left with the name so best course of action is to delete by title

  // var chosen = req.params.title;
  // const readID = fs.readFile('./db/db.json', (err, data) => {
  //   if (err) throw err;
  //   res.json(read)
  // });


  // _id: req.params.user_id
  //   }, function (err, user) {
  //       if (err) return res.send(err);
  //       res.json({ message: 'Deleted' });
  //   });
  // // remove with specified id
  // return res.json()
  // // rewrite them to db.json
  // return res.json(false);
// https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/
// example
 
    // const id = req.params.id;
    // const details = { '_id': new ObjectID(id) };
    // db.collection('notes').remove(details, (err, item) => {
    //   if (err) {
    //     res.send({ 'error': 'An error has occurred' });
    //   } else { res.send('Note ' + id + ' deleted!'); }
    // });



  //   delete(function(req, res) {
  //     Bear.remove({
  //         _id: req.params.bear_id
  //     }, function(err, bear) {
  //         if (err)
  //             res.send(err);

  //         res.json({ message: 'Successfully deleted' });
  //     });
  // });
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
// =============================================================


//Next steps
// connect the index.js functionality to the html
// it appears that there arent some elements for the JS to connect to on the html

// // with ID templating on db.json
// [{ "title": "Test Title", "text": "Test text", "id": "1" }]