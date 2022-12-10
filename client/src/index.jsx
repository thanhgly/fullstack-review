import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import { useState, useEffect } from 'react';

const App = (props) => {

  const [repos, setRepos] = useState([]);
  useEffect(() => {
    fetch()
      .then((data) => {
        setRepos(data);
      })
      .catch((err) => {
        console.log('ERROR in useEffect', err);
      })
  }, []);

  function fetch() {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        url: 'http://localhost:1128/repos',
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
          resolve(data);
        },
        error: (j, t, err) => {
          reject(err);
          console.log('ERROR in ajax GET request', err);
        }
      });
    })
  };

  function search(term) {
    console.log(`${term} was searched`);

    return new Promise((resolve, reject) => {
      var data = {username: term}
      $.ajax({
        type: "POST",
        url: 'http://localhost:1128/repos',
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
          resolve(data);
        },
        error: (j, t, err) => {
          console.log('ERROR in ajax POST request', err)
          reject(err);
        }
      });
    });
  }

  return (
  <div>
    <h1>Github Fetcher</h1>
    <RepoList repos={repos}/>
    <Search onSearch={search.bind(this)} fetch={fetch} setRepos={setRepos}/>
  </div>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));