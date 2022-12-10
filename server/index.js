const express = require('express');
const cors = require('cors');
const helpers = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));
app.use(cors());
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  var username = req.body.username;
  helpers.getReposByUsername(username)
    .then((repos) => {
      return db.save(repos);
    })
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.log('ERROR in post request to /repos', err);
      res.status(401).send(err);
    });
  });


app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos

  db.Repo.find().sort({x:1}).limit(25)
    .then((repos) => {
      res.status(201).send(repos);
    })
    .catch((err) => {
      res.status(401).send(err);
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

