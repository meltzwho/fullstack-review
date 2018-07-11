import React from 'react';

var RepoListEntry = (props) => {
    return (<div>
      <span>
        {props.repo[0]+"    "}
      </span>
      <a href={props.repo[1]}>
        {props.repo[1]}
      </a>
      <p></p>
      </div>
    );
}

export default RepoListEntry;
