import React, { Component } from 'react';
import './App.css';

import First from './pages/first'
import Upload from './pages/upload'
import StatusBar from './components/status_bar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        current_page: null,
        projName: null,
        userFiles: [],
        userProj: null,
    }
    this.updateProjName = this.updateProjName.bind(this)
  }


  updateProjName(name) {
    // Update project name and load next page
    this.setState({
      projName: name,
      current_page: <Upload />
    })
    console.log('App says: projName is', this.projName);
  }

  updateUserFile(filename) {
    this.setState({
      userFile: filename
    })
  }

  componentWillMount() {
    this.setState({
      current_page: <First update={this.updateProjName}/>
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
         <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400" rel="stylesheet"/>
          <h1>Artist name matcher</h1>
          <StatusBar />
        </header>

        <div>
          {this.state.current_page}
        </div>

      </div>
    );
  }
}

export default App;
