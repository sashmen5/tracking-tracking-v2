import { createStore } from 'redux';
import persistState from 'redux-localstorage';

import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

// TODO: check type
// @ts-ignore
const store = createStore(
  rootReducer,
  composeEnhancers(
    persistState() // It saves all the changes of whole application state in localstorage
  )
);

export default store;
