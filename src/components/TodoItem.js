import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import styled from 'styled-components'

import Edit from 'react-icons/lib/fa/edit'

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
  constructor(props){
    super(props);
    this.state = {
      editing: false
    }
      this.handleEditTodo = this.handleEditTodo.bind(this);
    }

  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired
  }

  

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleEditTodo(id){
    this.props.editTodoComponent(id);
    this.props.editTodoCategory();
  }

  handleSave = (id, text) => {
    const { idCategory } = this.props
    if (text.length === 0) {
      this.props.deleteTodo(idCategory,id)
    } else {
      this.props.editTodo(idCategory,id, text)
    }
    this.setState({ editing: false })
  }

  render() {
    const { todo, completeTodo, deleteTodo, idCategory} = this.props;

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
                 onChange={() => completeTodo(idCategory, todo.id)} />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <p onClick ={() => this.handleEditTodo(todo.id)}> <Edit /> </p>
          <button onClick={() => deleteTodo(idCategory, todo.id)}>x</button>       
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