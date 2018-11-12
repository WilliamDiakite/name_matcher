import React, { Component } from 'react';


export default class StatusBar extends Component {

  render () {
    return (
      <div className="status-bar">
        <div className="status-elt">1. Create/Load project</div>
        <div className="status-elt">2. Upload file</div>
        <div className="status-elt">3. Controlled vocabulary</div>
        <div className="status-elt">4. Constraints</div>
        <div className="status-elt">5. Matching method</div>
        <div className="status-elt">6. Validation</div>
      </div>
    )
  }
}
