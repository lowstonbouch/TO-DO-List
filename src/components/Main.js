import React, { Component } from 'react'
import AddTool from './AddTool'
import AddTodo from './AddTodo'
import CategorySection from './CategorySection'
import TodoSection from './TodoSection'
import styled from 'styled-components'

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
            idCategory: 0,
            renderEditTodo: false,
            editTodoId: 0,
            editTodoText: '',
            buttonEditTodo: false,
        }
        this.editIdTodo = this.editIdTodo.bind(this);
        this.editTodoCategory = this.editTodoCategory.bind(this);
        this.editTodoComponent = this.editTodoComponent.bind(this);
        this.handleAddTodoText = this.handleAddTodoText.bind(this);
      }

      handleAddTodoText(text){
        this.setState(prevState => ({
          editTodoText:text
        }));
      }

      editIdTodo(id) {
        this.setState(prevState => ({
          idCategory: id,
        }));
      }

      editTodoComponent = (id) => {
        this.setState(prevState => ({
          renderEditTodo: !this.state.renderEditTodo,
          editTodoid: id,
        }));
      }

      editTodoCategory() {
        this.setState(prevState => ({
          buttonEditTodo: !this.state.buttonEditTodo,
        }));
      }


    render() {
        const { category, actions } = this.props
      return (
        <MainSections>
        <Category>
          <AddTool category={category} actions={actions} />
          <CategorySection category={category} actions={actions} editIdTodo={this.editIdTodo} buttonEditTodo={this.state.buttonEditTodo} editTodoCategory={this.editTodoCategory}  editTodoComponent={this.editTodoComponent} renderEditTodo={this.state.renderEditTodo} editTodoText={this.state.editTodoText} editTodoId={this.state.editTodoId} idCategory={this.state.idCategory}/>
        </Category>
        <Todos>
          <AddTodo category={category} actions={actions} idCategory={this.state.idCategory} />
          <TodoSection category={category} actions={actions} idCategory={this.state.idCategory} handleAddTodoText={this.handleAddTodoText} editTodoCategory={this.editTodoCategory} editTodoComponent={this.editTodoComponent} renderEditTodo={this.state.renderEditTodo} editTodoId={this.state.editTodoId} /> 
        </Todos>
      </MainSections>    
      )
    }
  }