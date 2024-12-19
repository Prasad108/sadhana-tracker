import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index'; // Update the file path
import { thunk } from 'redux-thunk'; // Update the import

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;