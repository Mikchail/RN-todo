import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import TodoReducer from './todos/reducer';
import AuthReducer, { IUser } from './auth/reducer';
import {apiService} from '../api';
import { ITodoItem } from '../types/index.d';


export interface RootState {
  auth: IUser;
  todo: ITodoItem;
}

const rootReducers = combineReducers({
  todo: TodoReducer,
  auth: AuthReducer,
});


const store = createStore(
  rootReducers,
  applyMiddleware(ReduxThunk.withExtraArgument(apiService)),
);




export type Store = typeof store
export type RootReducersType = typeof rootReducers
export default store;
