var _ = require('lodash/core');
var React = require('react');
var ReactDOM = require('react-dom');
var redux = require('redux');
var Root = require('./Root.jsx')
var forumReducer = require('./reducer');

function render() {
  ReactDOM.render(
    <Root value={store.getState()} />,
    document.getElementById('app'),
    function() {
      document.getElementsByClassName('body')[0].classList.remove('is-loading');
    }
  );
}

window.store = redux.createStore(forumReducer);

store.subscribe(render);

render();

// set up sockets

var io = require('socket.io-client');

window.socket = io.connect(forum.constants.socketAddress, {
  query: {
    user: JSON.stringify(forum.constants.user)
  }
});

socket.on('destroy', function(response){
  window.store.dispatch({
    type: 'REMOVE',
    value: response.id
  });
});
