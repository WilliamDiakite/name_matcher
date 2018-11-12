import React, { Component } from 'react';
import './pages.css';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import Dropzone from '../../node_modules/react-dropzone';

export default class SecNewPage extends Component {


  onDrop(files) {
    console.log(files);

    this.setState({
      files
    });
  }


  render () {

    return(
      <div className="page">
        <h2>2. Create project:</h2>
        <div className="field">
          <TextField
            id="standard-dense"
            label="Project name"
            margin="dense"
            onChange={this.update_projName}
          />
        </div>

        <div className='dropzone-container'>
          <Dropzone
            onDrop={this.onDrop.bind(this)}
          >
            <p className="drop-text">  Drop the csv file containing list of name to match  </p>
          </Dropzone>
        </div>

      </div>
    )
  }
}
