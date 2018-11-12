import React, { Component } from 'react';
import './App.css';

import First from './pages/first'
import StatusBar from './components/status_bar'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        current_page: null,
        projName: null
    }

    this.update_page = this.update_page.bind(this)
  }

  update_page(page) {
    this.setState({
      current_page: page
    })
  }

  componentWillMount() {
    const page = 'First'
    this.setState({
      current_page: <First update_page={this.update_page}/>
    })
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
          {this.state.current_page}
        </div>
      </div>
    );
  }
}

export default App;
