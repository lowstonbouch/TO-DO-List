import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import TodoFooter from './TodoFooter'
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
    static propTypes = {
        category: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
      }
    

  state = { filter: SHOW_ALL }

  handleClearCompleted = () => {
    this.props.actions.clearCompleted(0)
  }

  handleShow = filter => {
    this.setState({ filter })
  }

  renderFooter(completedCount) {
    const { category } = this.props
    const { filter } = this.state
    const activeCount = category[0].todos.length - completedCount

    if (category[0].todos.length) {
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
    const { category, actions } = this.props
    const { filter } = this.state
    console.log(this.props);

    const filteredTodos = category[0].todos.filter(TODO_FILTERS[filter])
    const completedCount = category[0].todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    )

    return (
      <MainSections>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        {this.renderFooter(completedCount)}
      </MainSections>
    )
  }
}