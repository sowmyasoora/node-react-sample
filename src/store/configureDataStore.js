import { createStore, combineReducers } from 'redux';
import dataReducer from '../reducers/dataReducer';
// import filterReducer from '../reducers/filterReducer';

export default () => {
  const store = createStore(dataReducer);

  store.subscribe(() => {
    console.log(store.getState());
  })
  return store;
};
