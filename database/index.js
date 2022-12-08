const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  owner: String,
  link: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB

  var newRepos = repos.map((repo) => {
    var newRepo = new Repo({
      _id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      link: repo.html_url
    });
    return newRepo.save();
  });
  return Promise.all(newRepos);
}

module.exports.Repo = Repo;
module.exports.save = save;