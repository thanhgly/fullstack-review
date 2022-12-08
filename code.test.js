const axios = require('axios');
const mongoose = require('mongoose');
const config = require('./config.js');
const Helpers = require('./helpers/github.js');
const db = require('./database/index.js');

describe("getReposByUsername", function() {
  it("should eventually resolve with repos from github API", function(done) {
    Helpers.getReposByUsername('thanhgly', (err, data) => {
      if (err) throw err;
      var repo = data[0];
      expect(repo.full_name).toEqual('thanhgly/recursion-prompts');
      done();
    });

  });
});

describe("save", function() {

  beforeEach((done) => {
    db.Repo.collection.drop();
    done();
  });

  afterAll(() => {
    mongoose.disconnect('mongodb://localhost/fetcher')
  });

  it('should save repos from github API to database', function(done) {
    axios.get('https://api.github.com/users/thanhgly/repos')
      .then((result) => {
        return result.data;
      })
      .then((repos) => {
        return db.save(repos)
      })
      .then((savedData) => {
        return db.Repo.find()
      })
      .then((data) => {
        var repo = data[0];
        expect(repo._id).toEqual(489763231);
        expect(repo.name).toEqual('recursion-prompts');
        expect(repo.owner).toEqual('thanhgly');
        expect(repo.link).toEqual('https://github.com/thanhgly/recursion-prompts');
        done();
      })
      .catch((err) => {
        console.log('ERROR', err);
        done();
      })
  })
})