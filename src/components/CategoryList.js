import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import AddChildCategory from './AddChildCategory'
import ChildTextInput from './ChildTextInput'
import { addChild } from '../actions';
import styled from 'styled-components'

const Category = styled.div`
display: flex;
align-items: center;
height: 30px;
border: 1px solid black;
width: 100%;
`;

const Element = styled.li`
display: flex;
align-items: center;
`;


export class CategoryList extends Component {

  constructor(props){
    super(props);
    this.state = {
      addChild: false,
      editing: false,
    }
  }

  handleAddChildClick = e => {
    e.preventDefault()
    const { actions, id } = this.props
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
    const { id, actions} = this.props
    return (
      <Element key={childId}>
        <ConnectedNode id={childId} parentId={id} actions={actions}/>
      </Element>
    )
  }

  handleDoubleClick = () => {
    this.setState({ editing: true })
  }

  handleSave = (id, text) => {

    this.props.editNode(id, text)
    this.setState({ editing: false })
  }

  render() {
    const { text, childIds, id, actions } = this.props

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
        <div>
        <Category>
          <p onDoubleClick={this.handleDoubleClick}>
            {text}
            </p>
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        <a href="#" onClick={this.handleAddChildClick}>
              Add child
        </a>
        </Category>
        <ul>
          {this.state.addChild &&
              <AddChildCategory actions={actions} id={id}/>
          }
          { (childIds) && childIds.map(this.renderChild)}
        </ul>
        </div>
      )
    }
    return (
      <div>
        {element}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state.category[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(CategoryList)
export default ConnectedNode