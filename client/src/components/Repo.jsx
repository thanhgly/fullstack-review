import React from 'react';

const Repo = (props) => {
  const {name, des, owner, link} = props.repo;
  const ulStyle = {border: '2px solid', width:'500px', listStyleType:'none'}

  return (
    <ul style={ulStyle}>
      <a href={link} target="_blank"> Repository name: {name} </a>
      <li> Description: {des} </li>
      <li> Owner: {owner} </li>
      <li> Link: {link} </li>
    </ul>
  )
}

export default Repo;