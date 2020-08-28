import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/rootReducer';

const loggerMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  return result;
};

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware, reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
     
        <App />
     
    </Router>
  </Provider>,

  document.getElementById('root')
);

serviceWorker.unregister();
