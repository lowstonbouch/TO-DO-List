import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import generateTree from './generateTree'
import Node from './containers/Node'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Node />
  </Provider>,
  document.getElementById('root')
)
