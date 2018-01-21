import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import styled from 'styled-components'

const Todo = styled.div `
  display: flex;
  height: 60px;
  border: 1px solid #ededed;
  width: 100%;
`;

const Element = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
`;

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo(0,id)
    } else {
      this.props.editTodo(0,id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props
    console.log(this.props);

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      element = (
        <Element>
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => completeTodo(0, todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button 
                  onClick={() => deleteTodo(0, todo.id)}>
                  x
                  </button>
        </Element>
      )
    }

    return (
      <Todo className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </Todo>
    )
  }
}