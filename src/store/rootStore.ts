import { createStore } from 'redux';
import persistState from 'redux-localstorage';

import rootReducer from 'store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  // @ts-ignore TODO: check typing
  composeEnhancers(
    persistState() // It saves all the changes of whole application state in localstorage
  )
);

export default store;
