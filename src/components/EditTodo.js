import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TodoTextInput from './TodoTextInput'

import styled from 'styled-components'

const MainSections = styled.div `
display: flex;
width: 100%;
flex-direction: column;
justify-content:  center;
align-items: flex-start;
margin: 20px;
`;

const ButtonSection = styled.div`
display: flex;
width: 100%;
justify-content:  flex-end;
align-items: center;
margin: 20px;
`;


export default class EditTodo extends Component {

    constructor(props){
        super(props);
        this.state = {
            text: '',
            completed: this.props.completed,
        }
      }

    static propTypes = {
        editTodo: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        completeTodo: PropTypes.func.isRequired
      }

    handleSave = (id, text) => {
        this.setState(prevState => ({
            text: text,
          }));      
    }

    handleSaveDescription = (id, text) => {
             
    }

    saveEdit = (idTodo) =>{
        const { idCategory, completed, id } = this.props
        if (this.state.text.length === 0) {
          this.props.deleteTodo(idCategory,idTodo)
        } else {
          this.props.editTodo(idCategory,idTodo, this.state.text)
        }
        if(completed !== this.state.completed){
            this.props.completeTodo(idCategory, id)
        }
        this.props.editTodoComponent(idTodo);
        this.props.editTodoCategory();
    }

    handleCancel = (idTodo) => {
        this.props.editTodoComponent(idTodo);
        this.props.editTodoCategory();
    }

    handleChange = () =>{
        this.setState(prevState => ({
            completed: !this.state.completed
          })); 
    }

 
    render() {
        const { id, category, idCategory} = this.props
        return (
            <MainSections>
                <p> Category: {category[idCategory].text} </p>
                <ButtonSection>
                    <button onClick={() => this.saveEdit(id)}> Save </button>
                    <button onClick={() => this.handleCancel(id)}> Cancel </button>
                </ButtonSection>
                <TodoTextInput text={category[idCategory].todos[id].text} editing={this.state.editing} onSave={(text) => this.handleSave(id, text)} />
                <span><input className="toggle"
                     type="checkbox"
                     checked={this.state.completed}
                     onChange={this.handleChange} /> Done</span>
                
            <TodoTextInput text={category[idCategory].todos[id].descriptions} editing={this.state.editing}  onSave={(text) => this.handleSaveDescription(id, text)} />
            </MainSections>
        )
      }
    }