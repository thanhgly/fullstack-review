import React from 'react';
import {useState} from 'react';

const Search = (props) => {

  const [terms, setTerm] = useState('');

  function onChange (e) {
    setTerm(e.target.value);
  }

  function search() {
    props.onSearch(terms)
      .then(() => {
        return props.fetch()
      })
      .then((data) => {
        props.setRepos(data);
      })
      .catch((err) => {
        console.log('ERROR in search of Search component', err);
      })

  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={terms} onChange={onChange}/>
      <button onClick={search}> Add Repos </button>
    </div>
    )

}

export default Search;