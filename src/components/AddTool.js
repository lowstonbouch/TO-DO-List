import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import * as actions from '../actions'
import CategoryTextInput from './CategoryTextInput'

export default class AddTool extends Component {

    static propTypes = {
        category: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
      }

  handleSave = text => {
    if (text.length !== 0) {
        const { actions } = this.props
        console.log(this.props);
        const childId = actions.createNode(text).nodeId
        actions.addCategory(text, childId)
    }
  }

  render() {
    return (
      <header>
        <h1>add category</h1>
        <CategoryTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="Name new category?" />
      </header>
    )
  }
}
