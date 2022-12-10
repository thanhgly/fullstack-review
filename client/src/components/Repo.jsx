import React from 'react';

const Repo = (props) => {
  const ulStyle = {border: '2px solid', width:'max', listStyleType:'none'}

  return (
    <ul style={ulStyle}>
      <li> Repo name: {props.repo.name} </li>
      <li> Description: {props.repo.description} </li>
      <li> Owner: {props.repo.owner} </li>
      <li> Link: {props.repo.link} </li>
    </ul>
  )
}

export default Repo;