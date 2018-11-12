import React, { Component } from 'react';
import './pages.css';

import Dropzone from 'react-dropzone'

export default class SecNewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projName: null
    }
    this.componentConfig = this.componentConfig.bind(this)
  }

  componentConfig() {
    return {
      iconFiletypes: ['.csv'],
      showFiletypeIcon: true,
      postUrl: '/uploadHandler'
    }
  };

  render () {

    return(
      <div className="page">
        <h2>2. Create project:</h2>
        <div className="field">
          <input value='my-project-name' onChange={this.props.setProj}></input>
        </div>


        <div className="nav-btns">
          <div>Previous</div>
          <div className="empty"></div>
          <div>Next</div>
        </div>

      </div>
    )
  }
}
