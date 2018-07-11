const request = require('request');
const config = require('../config.js');
const fs = require('fs');
const db = require('../database/index.js')

var getReposByUsername = (username, exRes) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  var options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  request(options, (err, res, body) => {
    if(err){
      return console.error(err);
    }
    db.save(JSON.parse(body));
    exRes.send({});
  });

}

var getReposFromMongo = (username, exRes) => {
  db.repos.find({owner: username},(err, repos) => {
    if(err) return console.error(err);
    repos.sort((a,b) => {
      if(a.rank < b.rank) return 1;
      if(a.rank > b.rank) return -1;
      return 0;
    });
    repos = repos.slice(0, 25);
    exRes.send(repos);
  });
};

module.exports.getReposByUsername = getReposByUsername;
module.exports.getReposFromMongo = getReposFromMongo;
