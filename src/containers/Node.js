import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AddTool from '../components/AddTool'
import CategorySection from '../components/CategorySection'
import * as actions from '../actions'



// export class Node extends Component {

//   render() {
//     const { text, parentId, childIds, addChild, createNode, id, addCategory  } = this.props
//     console.log(this.props);
//     console.log(state);
//     return (
//       <div>
//         <AddTool addChild={addChild} createNode={createNode} id={id} addCategory={addCategory} />
//         <CategoryList text={text} parentId={parentId} childIds={childIds} id={id} />
//       </div>
//     )
//   }
// }

// function mapStateToProps(state, ownProps) {
//   return state[ownProps.id]
// }

// const ConnectedNode = connect(mapStateToProps, actions)(Node)
// export default ConnectedNode

const Node = ({category, actions}) => (
  <div>
    <AddTool category={category} actions={actions} />
    <CategorySection category={category} actions={actions}/>
  </div>

)

Node.propTypes = {
  category: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  category: state.category
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)