import React, { Component } from 'react';
import './App.css';

import First from './pages/first'
import SecNewPage from './pages/secnew'
import StatusBar from './components/status_bar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        current_page: 1,
        projName: null,
        userFile: null,
        userProj: null,
    }

    this.update_page = this.update_page.bind(this)
    this.updateProjName = this.updateProjName.bind(this)
  }

  update_page(page_id) {
    this.setState({
      current_page: page_id
    })
  }

  updateProjName(name) {
    this.setState({
      projName: name
    })
  }

  updateUserFile(filename) {
    this.setState({
      userFile: filename
    })
  }

  render_page(page_id) {
    if (page_id === 1) return <First updatePage={this.update_page}/>

    if (page_id === 21) return <SecNewPage
                                updatePage={this.update_page}
                                updateProjName={this.updateProjName}
                                updateUserFile={this.updateUserFile}
                              />


  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
         <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400" rel="stylesheet"/>
          <h1>Artist name matcher</h1>
          <StatusBar />
        </header>

        <div>
          {this.render_page(this.state.current_page)}
        </div>

        <div className="nav-btns">
          <div>Previous</div>
          <div className="empty"></div>
          <div>Next</div>
        </div>
        
      </div>
    );
  }
}

export default App;
