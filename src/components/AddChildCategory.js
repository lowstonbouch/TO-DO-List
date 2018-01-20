import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChildTextInput from './ChildTextInput'

export default class AddChildCategory extends Component {

  handleSave = text => {
    if (text.length !== 0) {
        const { actions, id } = this.props
        const childId = actions.createNode(text).nodeId
        actions.addChild(id, childId)
    }
  }

  render() {
        return (
            <div>
              <ChildTextInput
                             onSave={this.handleSave}
                             placeholder="Name new category?" />
            </div>
          )
    }
}