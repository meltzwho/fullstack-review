import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => {
  var repos = [];
  for(var repo of props.repos){
    repos.push(<RepoListEntry repo={repo} key={repo[1]}/>);
  }
  return (<div>
    <h4>Repo List Component</h4>
    There are {props.repos.length} repos.
    <div>{repos}</div>
  </div>)
};

export default RepoList;
