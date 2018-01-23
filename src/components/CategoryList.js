import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import AddChildCategory from './AddChildCategory'
import ChildTextInput from './ChildTextInput'
import styled from 'styled-components'

import AddChild from 'react-icons/lib/fa/plus-square-o'
import DeleteCategory from 'react-icons/lib/md/delete'
import Edit from 'react-icons/lib/fa/edit'
import OpenChilds from 'react-icons/lib/fa/angle-right'
import CloseChilds from 'react-icons/lib/fa/angle-down'
import ChangeCategory from 'react-icons/lib/md/undo'

const Category = styled.div`
display: flex;
align-items: center;
height: 30px;
border: 1px solid black;
width: 99%;
`;

const Buttons = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
`;

const BlockCategory = styled.div`
width: 100%;
`;

const Element = styled.li`
list-style-type: none;
`;

const ListChild = styled.ul`
margin: 0;
`;



export class CategoryList extends Component {

  constructor(props){
    super(props);
    this.state = {
      addChild: false,
      editing: false,
      renderChild: true,
    }
  }

  handleAddChildClick = e => {
    e.preventDefault()
    this.setState({
      addChild: !this.state.addChild,
    })
  }

  handleRemoveClick = e => {
    e.preventDefault()
    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id, actions, editIdTodo, editTodoText, buttonEditTodo, renderEditTodo, editTodoComponent, editTodoCategory} = this.props
    return (
      <Element key={childId}>
       {this.state.renderChild &&
        <ConnectedNode id={childId} parentId={id} editTodoText={editTodoText} actions={actions} editIdTodo={editIdTodo} buttonEditTodo={buttonEditTodo} editTodoComponent={editTodoComponent} editTodoCategory={editTodoCategory} renderEditTodo={renderEditTodo} editTodoId={this.props.editTodoId} idCategory={this.props.idCategory}/>
       }
      </Element>
    )
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleRenderChild = () =>{
    this.setState({ renderChild: !this.state.renderChild })
  }

  handleSave = (id, text) => {
    this.props.editNode(id, text)
    this.setState({ editing: false })
  }

  handleOpenTodos = () => {
    if(this.props.renderEditTodo){
      this.props.editTodoComponent()
      this.props.editTodoCategory();
    }
    this.props.editIdTodo(this.props.id);
    
    
  }

  handleEditCategory = () =>{
    const { actions } = this.props
    if (this.props.editTodoText.length !== 0) {
      actions.addTodo(this.props.id,this.props.editTodoText)
      actions.deleteTodo(this.props.idCategory,this.props.editTodoId)
    }
    console.log(this.props);
  }

  render() {
    const { text, childIds, id, actions, buttonEditTodo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <ul>
        <ChildTextInput text={text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(id, text)} />
        </ul>
      )
    } else {
      element = (
        <React.Fragment>
        <Category onClick={this.handleOpenTodos}>
        {(childIds.length > 0) &&
          <p onClick={this.handleRenderChild}>
          {this.state.renderChild &&
          <CloseChilds /> 
          }
          {!this.state.renderChild &&
          <OpenChilds />
          }
           </p>
        }
        <p >{text}</p>
        {!buttonEditTodo && 
        <Buttons>
          <p onClick={this.handleDoubleClick} > <Edit /> </p>
          <p onClick={this.handleRemoveClick} > <DeleteCategory /> </p>
          <p onClick={this.handleAddChildClick}> <AddChild /> </p>
        </Buttons>
        }  
        {buttonEditTodo && 
        <Buttons>
          <p onClick={this.handleEditCategory}> <ChangeCategory /> </p>
        </Buttons>
        }  
        </Category>
        <ListChild>
        {this.state.addChild &&
            <AddChildCategory actions={actions} id={id}/>
        }
        { (childIds) && childIds.map(this.renderChild)}
        </ListChild>
        </React.Fragment>
      )
    }
    return (
      <React.Fragment>
        {element}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.category[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(CategoryList)
export default ConnectedNode