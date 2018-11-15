import React, { Component } from 'react';
import './App.css';

import First from './pages/first'
import Upload from './pages/upload'
import Reconcile from './pages/reconcile'
import StatusBar from './components/status_bar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        current_page: null,
        projName: null,
        files: [],
        userProj: null,
    }
    this.updateProjName = this.updateProjName.bind(this)
    this.updateUserFiles = this.updateUserFiles.bind(this)
  }


  updateProjName(name) {
    // Update project name and load next page
    this.setState({
      projName: name,
      current_page: <Upload updateUserFiles={this.updateUserFiles}/>
    })
  }

  updateUserFiles(files) {
    this.setState({
      files: files,
      current_page: <Reconcile files={files} />
    })
  }

  componentWillMount() {
    this.setState({
      current_page: <First update={this.updateProjName}/>
    })
  }

  render() {
    console.log('App says projName', this.state.projName);
    return (
      <div className="App">
        <header className="App-header">
         <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
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
