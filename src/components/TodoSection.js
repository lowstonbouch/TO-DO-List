import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
import EditTodo from './EditTodo'
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters'
import styled from 'styled-components'

const MainSections = styled.div `
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
}

export default class TodoSection extends Component {
  constructor(props){
    super(props);
    this.state = {
        editTodo: false,
        editTodoId: 0,
        filter: SHOW_ALL
      }
      this.editTodoComponent = this.editTodoComponent.bind(this);
    }

    static propTypes = {
      category: PropTypes.object.isRequired,
      actions: PropTypes.object.isRequired
    }
     
    editTodoComponent = (id) => {
        this.setState(prevState => ({
          editTodo: !this.state.editTodo,
          editTodoid: id,
        }));
      }



  handleClearCompleted = () => {
    this.props.actions.clearCompleted(0)
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderFooter(completedCount) {
    const { category, idCategory } = this.props
    const { filter } = this.state
    const activeCount = category[idCategory].todos.length - completedCount

    if (category[idCategory].todos.length) {
      return (
        <TodoFooter completedCount={completedCount}
                activeCount={activeCount}
                filter={filter}
                onClearCompleted={this.handleClearCompleted}
                onShow={this.handleShow} />
      )
    }
  }

  render() {
    const { category, actions, idCategory, editTodoCategory } = this.props
    const { filter } = this.state

    if(!category[idCategory]){
      return 0
    }

    const filteredTodos = category[idCategory].todos.filter(TODO_FILTERS[filter])
    const completedCount = category[idCategory].todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )
    console.log('hesa');
    return (
      <div>
        {!this.state.editTodo &&
          <MainSections>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} idCategory={idCategory} editTodoComponent={this.editTodoComponent} editTodoCategory={editTodoCategory} />
          )}
          {this.renderFooter(completedCount)} 
          </MainSections>
        }
        {this.state.editTodo &&
          <EditTodo id={this.state.editTodoId} category={category} idCategory={idCategory}  {...actions} editTodoComponent={this.editTodoComponent} completed={category[idCategory].todos[this.state.editTodoId].completed}  editTodoCategory={editTodoCategory}/>
        }
      </div>
    )
  }
}