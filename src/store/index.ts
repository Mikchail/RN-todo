import {createStore, combineReducers} from 'redux';
import {reducer} from './reducers'
const rootReducers = combineReducers({
  todo: reducer
});

const store = createStore(rootReducers);

export default store;
