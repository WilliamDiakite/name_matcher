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
      selectId: null,
      selected: null
    }
    this.getMapper = this.getMapper.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleChange = (selectedOptions) => {
    var selected = this.state.selected
    selected[this.state.selectId] = selectedOptions
    this.setState({
      selected: selected
    })
  }

  // Because Select only returns the value and not the event,
  // handleClick gives an indication on which Select is being changed
  // still, right parentNode has to be found...
  handleClick = (event) => {
    var elt_selection = event.target.parentNode.parentNode.parentNode.parentNode
    if (elt_selection.className == 'elt-selection') {
      this.setState({
        selectId: elt_selection.id
      })
    }

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
      console.log('last select', this.state.selected[path]);
      return (
        <div
          key={`mapper-elt-${i}`}
          className='mapper-elt'
          onClick={this.handleClick}
        >
          <div className='elt-name'>{path}</div>
          <div
            className='elt-selection'
            id={path}
          >
            <Select
              value={this.state.selected[path]}
              onChange={this.handleChange}
              options={options}
              isSearchable
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
    var selected = {}
    this.props.files.forEach(f => {
      const path = f.path.split('/').pop()
      selected[path] = null
    })

    this.setState({
      files: this.props.files,
      selected: selected
    })
  }

  render() {
    return(
      <div className='page'>
        <h3>3. Confirgure reconcialiation</h3>
        <h4>Select columns to reconcile</h4>
        {this.getMapper()}
        <h4>Choose a controlled vocabulary</h4>
      </div>
    )
  }
}
