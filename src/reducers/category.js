import {ADD_CATEGORY, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE,
EDIT_NODE,  ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, CLEAR_COMPLETED, COMPLETE_CATEGORY, NO_COMPLETE_CATEGORY } from '../actions'

import undoable, { includeAction } from 'redux-undo'

const childIds = (state, action) => {
  switch (action.type) {
    case ADD_CHILD:
      return [ ...state, 
        action.childId ]
    case REMOVE_CHILD:
      return state.filter(id => id !== action.childId)
    default:
      return state
  }
}

let tree = {
  // 0: {
  //   id: 0,
  //   text: 'Use Redux',
  //   completed: true,
  //   childIds: [],
  //   todos: [],
  //   main: true,
  // }
}

const todos = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text,
          description: 'Description'
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo,
             text: action.text,
             description: action.description } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case CLEAR_COMPLETED:
      return state.filter(todo => todo.completed === false)

    default:
      return state
  }
}


const node = (state, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return {
        id: action.nodeId,
        text: action.text,
        completed: true,
        childIds: [],
        todos: [],
      }
    case ADD_CATEGORY:
      return{
        ...state,
        main: true,
      }
    case COMPLETE_CATEGORY:
    return{
      ...state,
      completed: !state.completed,
    }
    case NO_COMPLETE_CATEGORY:
    return{
      ...state,
      completed: false
    }
    case ADD_CHILD:
    case REMOVE_CHILD:
      return {
        ...state,
        childIds: childIds(state.childIds, action)
      }
    case EDIT_NODE:
    return{
      ...state,
      text: action.text,
    }
    case ADD_TODO:
      return{
        ...state,
        todos: todos(state.todos, action),
      } 

    case DELETE_TODO:
      return {
        ...state,
        todos: todos(state.todos, action),
      } 

    case EDIT_TODO:
    return {
      ...state,
      todos: todos(state.todos, action),
    }

    case COMPLETE_TODO:
    return {
      ...state,
      todos: todos(state.todos, action),
    }
    
    case CLEAR_COMPLETED:
    return {
      ...state,
      todos: todos(state.todos, action),
    }
    default:
      return state
  }
}

const getAllDescendantIds = (state, nodeId) => (
  state[nodeId].childIds.reduce((acc, childId) => (
    [ ...acc, childId, ...getAllDescendantIds(state, childId) ]
  ), [])
)

const deleteMany = (state, ids) => {
  state = { ...state }
  ids.forEach(id => delete state[id])
  return state
}

function category (state = tree, action) {
  const { nodeId } = action
  if (typeof nodeId === 'undefined') {
    return state
  }

  if (action.type === DELETE_NODE) {
    const descendantIds = getAllDescendantIds(state, nodeId)
    return deleteMany(state, [ nodeId, ...descendantIds ])
  }

  return {
    ...state,
    [nodeId]: node(state[nodeId], action)
  }
}

const undoableTodos = undoable(category)

export default undoableTodos
