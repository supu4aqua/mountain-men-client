import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import {Provider} from 'react-redux';
import store from './store.js';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <App />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
