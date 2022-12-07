const axios = require('axios');
const config = require('./config.js');
const getReposByUsername = require('./helpers/github.js').getReposByUsername;


describe("getReposByUsername", function() {
  it("should eventually resolve with repos from github API", function() {
    getReposByUsername('thanhgly', (err, data) => {
      if (err) throw err;
      expect(data).toBeDefined();
    });

  });
});