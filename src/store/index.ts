import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import TodoReducer from './todos/reducer';
import AuthReducer from './auth/reducer';
import {apiService} from '../api';

const rootReducers = combineReducers({
  todo: TodoReducer,
  auth: AuthReducer,
});

export type RootState = ReturnType<typeof rootReducers>


const store = createStore(
  rootReducers,
  applyMiddleware(ReduxThunk.withExtraArgument(apiService)),
);


export type Store = typeof store
export type RootReducersType = typeof rootReducers
export default store;
