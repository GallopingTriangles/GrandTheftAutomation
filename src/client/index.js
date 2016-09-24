import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './app/components/App.jsx';
import reducer from './app/reducers/reducer.js';


/*
** Create a Redux store that will keep track of the state of all components.
** The reducer will handle updating store when an action has been dispatched.
** Components subscribed to the store will re-render upon a change to the state-tree
*/
var store = createStore(reducer);

/*
** Wrap the root component in a Provider
** Child components can access the store through context
*/
var render = () => {
  ReactDOM.render(
    <Provider store={ store } >
      <App />
    </Provider>,
    document.getElementById('app')
  )
}

render();
store.subscribe(render); // App will re-render when the store has been changed