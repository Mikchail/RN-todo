import { Action, Reducer } from 'redux';
import {
  createActions,
  handleActions,
  combineActions,
  createAction,
  handleAction,
  ReduxCompatibleReducer,
} from 'redux-actions';
import { ITodoItem } from '../types/index.d';

const initialState = [
  {
    id: '1',
    title: 'Выучить react native',
    isComplite: false,
  },
  {
    id: '2',
    title: 'Выучить латынь',
    isComplite: false,
  },
  {
    id: '3',
    title: 'Выучить typescript',
    isComplite: false,
  }, 
  {
    id: '33',
    title: 'Выучить английский',
    isComplite: false,
  },
];

const TODO_ITEM_UPDATA = "TODO_ITEM_UPDATA";
const TODO_ITEM_COMPLITE = "TODO_ITEM_COMPLITE";
export const todoItemUpdate = createAction<ITodoItem>(TODO_ITEM_UPDATA);
export const todoItemComplite = createAction<ITodoItem>(TODO_ITEM_COMPLITE);

export const reducer: ReduxCompatibleReducer<ITodoItem[],ITodoItem> = handleAction(
  TODO_ITEM_COMPLITE,
  (state, action) => {
    const newData = [...state];
    const { payload } = action
    const elemIndex = state.findIndex((d)=> d.id === payload.id)
    newData[elemIndex] = {
      id: newData[elemIndex].id,
      title: newData[elemIndex].title,
      isComplite: !newData[elemIndex].isComplite,
    }
    console.log(newData);
    
    return newData;
  },
  initialState as ITodoItem[]
);

export default reducer;
