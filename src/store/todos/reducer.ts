import {handleActions, Action} from 'redux-actions';
import {ITodoItem} from '../../types/index.d';
import {
  CREATE_TODO_ITEM,
  DONE_TODO_ITEM,
  SET_ERROR_TODO_ITEM,
  SET_TODO_ITEMS,
  UPDATE_ITEM_UPDATA,
  LOADING_TODO_ITEMS,
  DELETE_TODO_ITEM,
} from './actions';

interface IInitialState {
  todos: ITodoItem[] | [];
  error: boolean | string;
  loading: boolean;
}

const initialState: IInitialState = {
  todos: [],
  error: false,
  loading: true,
};

const reducerMap = {
  [DONE_TODO_ITEM]: (state: IInitialState, action: Action<ITodoItem>) => {
    const newData = [...state.todos];
    if (!action.payload) {
      return state;
    }
    const {payload} = action;

    const elemIndex = newData.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      ...newData[elemIndex],
      isComplite: !newData[elemIndex].isComplite,
    };
    return {...state, todos: newData};
  },
  [UPDATE_ITEM_UPDATA]: (state: IInitialState, action: Action<ITodoItem>) => {
    const newData = [...state.todos];
    const {payload} = action;
    const elemIndex = newData.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      ...newData[elemIndex],
      ...action.payload,
    };
    return {...state, todos: newData};
  },
  [CREATE_TODO_ITEM]: (state: IInitialState, action: Action<ITodoItem>) => {
    return {...state, todos: [...state.todos, action.payload]};
  },
  [SET_ERROR_TODO_ITEM]: (
    state: IInitialState,
    action: Action<boolean | string>,
  ) => {
    return {...state, error: action.payload};
  },
  [LOADING_TODO_ITEMS]: (state: IInitialState, action: Action<boolean>) => {
    return {...state, loading: action.payload};
  },
  [SET_TODO_ITEMS]: (state: IInitialState, action: Action<ITodoItem[]>) => {
    return {...state, todos: [...action.payload]};
  },
  [DELETE_TODO_ITEM]: (state: IInitialState, action: Action<string>) => {
    const elemIndex = state.todos.findIndex((d) => d.id === action.payload);
    const newData = [
      ...state.todos.slice(0, elemIndex),
      ...state.todos.slice(elemIndex + 1),
    ];

    return {...state, todos: newData};
  },
};

const reducer = handleActions<IInitialState, any>(reducerMap, initialState);

export default reducer;
