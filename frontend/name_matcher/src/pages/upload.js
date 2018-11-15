import React, { Component } from 'react';
import './pages.css';

import Dropzone from '../../node_modules/react-dropzone';

import ReactTable from "react-table"
import "react-table/react-table.css"

import Button from '@material-ui/core/Button'


export default class Upload extends Component {

  constructor(props) {
    super(props)
    this.state = {
      files: [],
      nbFiles: 0,
      focus: 0,
      preview: null,
    }
    this.updatePreview = this.updatePreview.bind(this)
    this.getTable = this.getTable.bind(this)
    this.headerHandler = this.headerHandler.bind(this)
    this.cancelFile = this.cancelFile.bind(this)
    this.validateFile = this.validateFile.bind(this)
  }

  onDrop(files) {
    fetch('http://127.0.0.1:5000/api/file-reader/', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filePath: files[0].path,
      })
    })
      .then(response => response.json())
      .then(response => {
        var files = this.state.files
        files.push(response)
        this.setState({
          files: files,
          nbFiles: files.length,
        })
        this.setState({
          preview: this.updatePreview(0),
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  headerHandler(e) {
    console.log('event received')
    const fileId = parseInt(e.target.id)

    if (fileId !== this.state.focus) {
      console.log(fileId, this.state.focus)
      this.setState({
        focus: parseInt(fileId),
        preview: this.updatePreview(fileId),
      })
    }
  }

  updatePreview(focus) {
    var table = null

    const items = this.state.files.map((f, i) => {
      const path = f.path.split('/').pop()
      var className = null

      if (parseInt(focus) === i) {
        className = 'header-item-focused'
        table = this.getTable(f)
      }
      else {
        className = 'header-item'
      }
      return( <div
                key={i}
                className={className}
                onClick={this.headerHandler}
                id={i}
              >
              {path}
              <i className="material-icons"
                onClick={this.cancelFile}>
                clear
              </i>
              </div>)
    })
    return(<div
              className='preview'
            >
              <div
               className='preview-header'
               key='preview-header'
              >
               {items}
             </div>
             <div
               className='preview-table'
               >
              {table}
             </div>
          </div>)
  }

  getTable(file) {
    const columns = file.labels.map(l => {
      return {
        Header: l,
        accessor: l
      }
    })
    return (<div
              key='table'
              >
              <ReactTable
                data = {file.data}
                columns={columns}
                defaultPageSize={10}
              >
              </ReactTable>
            </div>)
  }


  cancelFile() {
    const index = parseInt(this.state.focus)
    const files = this.state.files
    files.splice(index, 1)

    this.setState({
      files: files,
      nbFiles : files.length,
      focus: 0,
    })
    this.setState({
      preview: this.updatePreview(0),
    })
  }

  validateFile() {
    console.log('validateFile has been called');
    this.props.updateUserFiles(this.state.files)
  }

  render() {
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

        <div className='preview-container'>
          <h3>File preview ({this.state.nbFiles})</h3>
          {this.state.preview}
        </div>

        {this.state.nbFiles > 0 ? (
          <div className='validation'>
            <p>All your files are correctly parsed? If yes, click the button below:</p>
            <div className='btn'>
              <Button
                variant="outlined"
                color='primary'
                onClick={() => this.props.updateUserFiles(this.state.files)}
              >
              Next
              </Button>
            </div>
          </div>
        ) : (<div />)}
      </div>
    )
  }
}
