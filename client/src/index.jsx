import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    // $.post('http://localhost:1128/repos', 'term', (data, status) => {
    //   console.log('search in app component', data);
    // });

    $.ajax({
      type: "POST",
      url: 'http://localhost:1128/repos',
      data: term,
      success: (data) => {console.log('Post successfully!')},
      error: (j, t, err) => {console.log('ERROR', err)},
      dataType: 'text',
      contentType: 'application/text'
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));