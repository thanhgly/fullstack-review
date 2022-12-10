import React from 'react';
import Repo from './Repo.jsx';

const RepoList = (props) => (
  <div>
    <h3> Repo List Component </h3>
    There are {props.repos.length} repos.
    {props.repos.map((repo) => <Repo key={repo._id} repo={repo}/>)}
  </div>
)

export default RepoList;