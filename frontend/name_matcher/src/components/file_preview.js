import React, { Component } from 'react'
import './file_preview.css'

import ReactTable from "react-table"
import "react-table/react-table.css"

import Button from '@material-ui/core/Button'


export default class FilePreview extends Component {

  constructor(props) {
    super(props)
    this.state = {
      focus: 0,
      validFiles: []
    }
    this.updateHeader = this.updateHeader.bind(this)
    this.updateTable = this.updateTable.bind(this)
  }

  headerHandler(e) {
    e.preventDefault()

    this.setState({
      focus: parseInt(e.target.id),
    })

    this.updateHeader()
    this.updateTable()
  }

  validateFile(fileId) {
    this.setState({
      validFiles: this.validFiles.push(this.props.files[])
    })
  }


  updateHeader(focus) {
    const items = this.props.files.map((f, i) => {
      let path = f.path.split('/').pop()
      let className = parseInt(this.state.focus) === i ? 'header-item-focused' : 'header-item'
      return( <div key='{i}'
                className={className}
                onClick={this.headerHandler}
                id={i}
              >
              {path}
              </div>)
    })
    console.log('items', items);
    this.setState({
      header: (<div
               className='preview-header'
               key='header'
              >
               {items}
               <hr/>
             </div>)
          })
  }

  updateTable() {
    const file = this.props.files[this.state.focus]
    console.log('updateTable says', file);
    const columns = file.labels.map(l => {
      return {
        Header: l,
        accessor: l
      }
    })
    this.setState({
      table:(<div>
              <ReactTable
                data = {file.data}
                columns={columns}
                defaultPageSize={10}
              >
              </ReactTable>

              <div className="validation-btns">
                <div className='btn'>
                  <Button
                    variant="outlined"
                    color='secondary'
                    onClick={this.cancelFile}
                  >
                    Cancel this file
                  </Button>
                </div>

                <div className='btn'>
                  <Button
                    variant="outlined"
                    color='primary'
                    onClick={this.validateFile}
                  >
                    Add another file
                  </Button>
                </div>

              </div>
            </div>)
    })
  }

  componentWillMount() {
    this.updateHeader()
    this.updateTable()
  }

  render() {
    console.log('filePreview says files', this.props.files);
    console.log('filePreview says nbFiles', this.props.nbFiles);
    return(
      <div className='preview-container'>
        <h3>File preview ({this.props.nbFiles})</h3>
        {this.state.header}

        {this.state.table}

      </div>
    )
  }

}
