import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import AddTool from '../components/AddTool'
import AddTodo from '../components/AddTodo'
import CategorySection from '../components/CategorySection'
import TodoSection from '../components/TodoSection'
import * as actions from '../actions'
import styled from 'styled-components'
import { CategoryList } from '../components/CategoryList';

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

const Node = ({category, actions}) => (
  <MainSections>
    <Category>
      <AddTool category={category} actions={actions} />
      <CategorySection category={category} actions={actions} />
    </Category>
    <Todos>
      <AddTodo category={category} actions={actions} />
      <TodoSection category={category} actions={actions} /> 
    </Todos>
  </MainSections>

)

Node.propTypes = {
  category: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  category: state.category,
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Node)