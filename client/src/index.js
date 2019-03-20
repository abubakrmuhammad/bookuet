import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import PromiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducers from './reducers';
import Routes from './routes';
import './resources/css/styles.css';

const createStoreWithMiddleware = applyMiddleware(PromiseMiddleware, ReduxThunk)(createStore);
const store = createStoreWithMiddleware(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
