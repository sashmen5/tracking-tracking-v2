import { applyMiddleware, createStore } from 'redux';

import rootReducer from 'store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import apiMiddleware from 'middlewares/apiMiddleware';

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(apiMiddleware))
);

export default store;
