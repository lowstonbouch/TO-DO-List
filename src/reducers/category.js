import {ADD_CATEGORY, ADD_CHILD, REMOVE_CHILD, CREATE_NODE, DELETE_NODE,
EDIT_NODE,  ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../actions'

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

let todosState = [
  {
    text: 'Use Redux',
    completed: false,
    id: 0
  }
]

let tree = {
  0: {
    id: 0,
    text: 'Use Redux',
    childIds: [],
    todos: [],
    main: true,
  }
}

const todos = (state, action) => {
  // console.log('her');
  // console.log(state);
  // console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
          completed: false,
          text: action.text
        }
      ]

    case DELETE_TODO:
      return state.filter(todo =>
        todo.id !== action.id
      )

    case EDIT_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, text: action.text } :
          todo
      )

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ?
          { ...todo, completed: !todo.completed } :
          todo
      )

    case COMPLETE_ALL:
      const areAllMarked = state.every(todo => todo.completed)
      return state.map(todo => ({
        ...todo,
        completed: !areAllMarked
      }))

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
        childIds: [],
        todos: [],
      }
    case ADD_CATEGORY:
      return{
        ...state,
        main: true,
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

    case COMPLETE_ALL:
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

export default function category (state = tree, action) {
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
