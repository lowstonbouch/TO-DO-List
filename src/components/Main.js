import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AddTool from './AddTool'
import AddTodo from './AddTodo'
import CategorySection from './CategorySection'
import TodoSection from './TodoSection'
import styled from 'styled-components'
import CategoryList from './CategoryList';

const MainSections = styled.div `
  display: flex;
  width: 1200px;
  margin: 0 auto;
`;

const Category = styled.div`
  width: 20%;
`;

const Todos = styled.div`
width: 80%;
`;

export default class Main extends Component {
    constructor(props){
        super(props);
        this.state = {
            idTodo: 0,
        }
        this.editIdTodo = this.editIdTodo.bind(this);
      }

      editIdTodo(id) {
        this.setState(prevState => ({
          idTodo: id,
        }));
      }


    render() {
        const { category, actions } = this.props
        console.log(this.state.idTodo);
      return (
        <MainSections>
        <Category>
          <AddTool category={category} actions={actions} />
          <CategorySection category={category} actions={actions} editIdTodo={this.editIdTodo}  />
        </Category>
        <Todos>
          <AddTodo category={category} actions={actions} idCategory={this.state.idTodo} />
          <TodoSection category={category} actions={actions} idCategory={this.state.idTodo} /> 
        </Todos>
      </MainSections>    
      )
    }
  }