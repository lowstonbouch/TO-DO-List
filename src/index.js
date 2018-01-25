import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import Node from './containers/Node'
import '../node_modules/normalize.css/normalize.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const store = createStore(reducer)

render(
  <Provider store={store}>
    <Node />
  </Provider>,
  document.getElementById('root')
)
