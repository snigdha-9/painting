import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import Reducers from './reducers';

export const ConfigureStore = () => {
  const store = createStore(Reducers, composeWithDevTools(applyMiddleware(thunkMiddleware, logger)));

  return store;
};

export default ConfigureStore;
