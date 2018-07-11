const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

  var repoSchema = mongoose.Schema({
    // TODO: your schema here!
    id: {
      type: Number,
      unique: true
    },
    owner: String,
    rank: Number,
    full_name: String,
    html_url: String,
    repoMeta: String
  });

  var Repo = mongoose.model('Repo', repoSchema);

  var save = (repos) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB
    if(repos.message) return;
    repos.forEach((repo) => {

      var newRepo = new Repo({
        id: repo.id,
        owner: repo.owner.login,
        rank: repo.forks_count + repo.watchers_count,
        full_name: repo.full_name,
        html_url: repo.html_url,
        repoMeta: JSON.stringify(repo)
      });

      newRepo.save((err, repo) => {
        if (err){return;}
      });

    });
  }

  module.exports.save = save;
  module.exports.repos = Repo;

});

module.exports.db = db;
