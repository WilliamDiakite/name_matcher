import React, { Component } from 'react';


export default class SecLoadPage extends Component {
  render () {
    return(
      <div className="secNewPage">

        <h2>2. Load project:</h2>

        <div className="btn-list">
          <div className="ghost-button" onClick={this.new}>Create</div>
          <div className="ghost-button" onClick={this.load}>Load</div>
        </div>

      </div>
    )
  }
}
