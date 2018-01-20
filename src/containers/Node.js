import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AddTool from '../components/AddTool'
import CategorySection from '../components/CategorySection'
import * as actions from '../actions'


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