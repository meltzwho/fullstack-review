const express = require('express');
const bodyParser = require('body-parser');
const util = require('../helpers/github.js');
var app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());

app.post('/repos', function (req, res) {
  util.getReposByUsername(req.body.term, res);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  util.getReposFromMongo(req.query.term, res);
  // TODO - your code here!
  // This route should send back the top 25 repos
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
