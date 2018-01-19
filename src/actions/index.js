export const CREATE_NODE = 'CREATE_NODE'
export const DELETE_NODE = 'DELETE_NODE'
export const ADD_CHILD = 'ADD_CHILD'
export const REMOVE_CHILD = 'REMOVE_CHILD'
export const ADD_CATEGORY = 'ADD_CATEGORY'

let nextId = 0

export const createNode = (text) => ({
  type: CREATE_NODE,
  text: text,
  nodeId: `new_${nextId++}`
})

export const deleteNode = (nodeId) => ({
  type: DELETE_NODE,
  nodeId
})

export const addCategory = (text, nodeId) => (
  {
    type: ADD_CATEGORY,
    text: text,
    nodeId: nodeId,
    main: true,
  }
)

export const addChild = (nodeId, childId) => ({
  type: ADD_CHILD,
  nodeId,
  childId,
})

export const removeChild = (nodeId, childId) => ({
  type: REMOVE_CHILD,
  nodeId,
  childId
})
