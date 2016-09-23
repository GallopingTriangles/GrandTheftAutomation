import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import App from './app/components/App.jsx';
import reducer from './app/reducers/reducer.js';

var store = createStore(reducer);

var render = () => {
  ReactDOM.render(
    <App store={ store } />,
    document.getElementById('app')
  )
}

render();
store.subscribe(render);