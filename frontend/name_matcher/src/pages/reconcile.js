import React, { Component } from 'react';
import './pages.css';

import Select from 'react-select'


export default class Reconcile extends Component {
  constructor(props) {
    super(props)
    this.hiddenSelect = React.createRef()
    this.state = {
      files: null,
      mapper: null,
    }
    this.getMapper = this.getMapper.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleNativeChange = this.handleNativeChange.bind(this)
  }
  // the react-select only gives us an array of selected option
  // so we generate a "fake" change event on our 'native' select
  handleChange = (selectedOptions) => {
    this.setState(() => ({ selectedOptions }), () => {
      // ! this is a bit hacky.. use at your own risk ;) !
      const event = new Event("change", { bubbles: true })
      this.hiddenSelect.current.dispatchEvent(event)
    })
  }
  handleNativeChange(event) {
    console.log(event);
  }

  getMapper() {
    const mapper = this.state.files.map((f, i) => {
      const path = f.path.split('/').pop()
      const options = f.labels.map(l => {
        return {
          value: l,
          label: l
        }
      })
      return (
        <div
          key={`mapper-elt-${i}`}
          className='mapper-elt'
        >
          <div className='elt-name'>{path}</div>
          <div className='elt-selection'>
            <Select
              ref={this.hiddenSelect}
              value={f.reconcile}
              onChange={this.handleChange}
              options={options}
              isSearchable
              path={f.path}
            />
          </div>
        </div>
      )
    })
    return (
      <div
        key= 'mapper'
        className='mapper'
      >
      {mapper}
      </div>
    )
  }

  componentWillMount() {
    this.setState({files: this.props.files})
  }

  componentDidMount() {
    this.setState({mapper: this.getMapper()})
  }

  render() {
    return(
      <div className='page'>
        <h3>3. Confirgure reconcialiation</h3>
        <h4>Select columns to reconcile</h4>
        {this.state.mapper}
        <h4>Choose a controlled vocabulary</h4>
      </div>
    )
  }
}
