import React, { Component } from 'react';
import './pages.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

export default class First extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projName: null
    }
  }

  render() {

    const handleSubmit = e => {
      e.preventDefault()
      if(this.state.projName == null) {
        //alert user for empty project name
      }
      else {
        console.log(this.state.projName);
        this.props.update(this.state.projName)
      }
    }

    const updateName = event => {
      this.setState({
        projName: event.target.value
      })
    }

    return (
      <div className="page">

        <h2>1. Create a project</h2>

      <form onSubmit={handleSubmit}>
          <div className="field">
            <TextField
              id="standard-dense"
              label="Project name"
              margin="dense"
              onChange={updateName}
            />
          </div>

          <div className='field'>
            <Button
              variant="outlined"
              type="submit"
            >
              Next step
            </Button>
          </div>
        </form>
      </div>
    )
  }
}
