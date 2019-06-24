import React from "react";
import ReactDOM from "react-dom";
import { createStore, connect } from "redux";
import { Provider } from "react-redux";

// redux logic (should be in a seperate reducer folder):

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

// component logic (should be in Counter.jsx):

const Counter = (props) => {
  return (
    <div>
      Vrijednost: {props.value}
      <button onClick={props.increment}> + </button>
      <button onClick={props.decrement}> - </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    value: state,
  };
}

const actions = {
  increment: () => ({ type: 'INCREMENT' }),
  decrement: () => ({ type: 'DECREMENT' }),
};

const ConnectedCounter = connect(mapStateToProps, actions)(Counter);

// should be in root index.js:

const store = createStore(reducer);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  rootElement
);
