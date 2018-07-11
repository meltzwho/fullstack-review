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
    $.ajax({
      url: "http://localhost:1128/repos",
      type: 'POST',
      data: {term: term},
      success: () => {
        $.ajax({
          url: "http://localhost:1128/repos",
          type: 'GET',
          data: {term: term},
          success: (results) => {
            results = results.map((el) => {
              return [el.full_name, el.html_url];
            });
            this.setState({
              repos : results //results typeof should === Array
            });
          },
          error: (err) => {
            console.error(err);
          }
        });
      },
      error: (err) => {
        console.error(err);
      }
    });
    // TODO
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
