import React, { Component } from 'react';
import './pages.css';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import Dropzone from '../../node_modules/react-dropzone';

export default class Upload extends Component {

  onDrop(files) {
    console.log(files);
    console.log('path: ',files[0].path);
    this.setState({
      files
    });
  }

  render () {

    return(
      <div className="page">
        <h2>2. Upload your files</h2>

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
