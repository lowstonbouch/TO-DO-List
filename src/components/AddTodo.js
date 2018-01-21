import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'
import styled from 'styled-components'

const Inpute = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export default class AddTodo extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleSave = text => {
    const { actions } = this.props
    console.log(actions);
    if (text.length !== 0) {
      actions.addTodo(0,text)
    }
  }

  render() {
    return (
      <Inpute>
        <h1>todos</h1>
        <TodoTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="What needs to be done?" />
      </Inpute>
    )
  }
}