import React, { Component } from 'react';
import './pages.css';

import SecNewPage from './secnew'
import SecLoadPage from './secload'

export default class First extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.new = this.new.bind(this)
    this.load = this.load.bind(this)

    console.log(this.props);
  }

  new () {
    this.props.updatePage(21)
  }

  load() {
    this.updatePage(22)
  }

  render() {
    return (
      <div className="page">

        <h2>1. Create or load a project:</h2>

        <div className="btn-list">
          <div className="ghost-button" onClick={this.new}>Create</div>
          <div className="ghost-button" onClick={this.load}>Load</div>
        </div>

      </div>
    )
  }
}
