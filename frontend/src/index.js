import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App'
import PostDetail from './components/PostDetail'
import registerServiceWorker from './registerServiceWorker'
import rootReducer from './reducers'

import 'semantic-ui-css/semantic.min.css'
import './index.css'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/posts/:id' component={PostDetail} />
        <Route exact path='/:category' component={App} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
