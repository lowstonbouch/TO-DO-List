import React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'


export class CategoryList extends Component {

  // static propTypes = {
  //   category: PropTypes.object.isRequired,
  //   actions: PropTypes.object.isRequired
  // }

  handleAddChildClick = e => {
    e.preventDefault()
    const { actions, id } = this.props
    // console.log(this.props);
    // console.log(this.propTypes);
    const childId = actions.createNode(`child:${id}`).nodeId
    actions.addChild(id, childId)
  }

  handleRemoveClick = e => {
    e.preventDefault()
    const { removeChild, deleteNode, parentId, id } = this.props
    removeChild(parentId, id)
    deleteNode(id)
  }

  renderChild = childId => {
    const { id, actions, text } = this.props
    console.log(childId);
    return (
      <li key={childId}>
        <ConnectedNode id={childId} parentId={id} actions={actions}/>
      </li>
    )
  }

  render() {
    const { text, parentId, childIds, } = this.props
    console.log(this.props);
    return (
      <div>
       {text}
        {' '}
        {
          <a href="#" onClick={this.handleRemoveClick} // eslint-disable-line jsx-a11y/href-no-hash
             style={{ color: 'lightgray', textDecoration: 'none' }}>
            ×
          </a>
        }
        <a href="#" // eslint-disable-line jsx-a11y/href-no-hash
              onClick={this.handleAddChildClick}
            >
              Add child
            </a>
        <ul>
          { (childIds) && childIds.map(this.renderChild)}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state)
  console.log(ownProps)
  return state.category[ownProps.id]
}

const ConnectedNode = connect(mapStateToProps, actions)(CategoryList)
export default ConnectedNode