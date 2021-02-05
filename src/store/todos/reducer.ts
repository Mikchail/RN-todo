import {Dispatch} from 'react';
import {Store} from 'redux';
import {handleActions, createAction, Action} from 'redux-actions';
import ApiService from '../../api';
import {ITodoItem} from '../../types/index.d';
import { RootState } from './../index';

const initialState = [
  {
    id: '1',
    title: 'Выучить react native',
    description: 'react-native lorem Alert react-native',
    photo: undefined,
    isComplite: true,
  },
  {
    id: '2',
    title: 'Выучить латынь',
    description: 'react-native lorem Alert react-native',
    photo: undefined,
    isComplite: false,
  },
  {
    id: '3',
    title: 'Выучить typescript',
    description: 'react-native lorem Alert react-native',
    photo: undefined,
    isComplite: true,
  },
  {
    id: '33',
    title: 'Выучить английский',
    description:
      'react-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-nativereact-native lorem Alert react-native',
    photo: undefined,
    isComplite: false,
  },
];

const UPDATE_ITEM_UPDATA = 'TODO_ITEM_UPDATA';
const DONE_TODO_ITEM = 'DONE_TODO_ITEM';
const CREATE_TODO_ITEM = 'CREATE_TODO_ITEM';

export const updateTodoItem = createAction<ITodoItem>(UPDATE_ITEM_UPDATA);
export const donetTodoItem = createAction<ITodoItem>(DONE_TODO_ITEM);
export const createTodoItem = createAction<ITodoItem>(CREATE_TODO_ITEM);

export const createTodoOnServer =  (
  newTodo: ITodoItem,
) => async (dispatch: Dispatch<any>, getState: () => RootState, api: ApiService) => {
  try {
    const token = getState().auth.user?.token || ''
    const userId = getState().auth.user?.id || ''
    const response = await api.createProduct(newTodo, token, userId);
    console.log(response)
    dispatch(createTodoItem(newTodo))
  } catch (error) {
    console.log(error);
  }
};

const reducerMap = {
  [DONE_TODO_ITEM]: (state: ITodoItem[], action: Action<ITodoItem>) => {
    const newData = [...state];
    if (!action.payload) {
      return state;
    }
    const {payload} = action;

    const elemIndex = state.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      ...newData[elemIndex],
      isComplite: !newData[elemIndex].isComplite,
    };
    return newData;
  },
  [UPDATE_ITEM_UPDATA]: (state: ITodoItem[], action: Action<ITodoItem>) => {
    const newData = [...state];
    const {payload} = action;

    const elemIndex = state.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      ...newData[elemIndex],
      title: payload.title,
      description: payload.description,
      photo: payload.photo || undefined,
      isComplite: !newData[elemIndex].isComplite,
    };
    return newData;
  },
  [CREATE_TODO_ITEM]: (state: ITodoItem[], action: Action<ITodoItem>) => {
    return [...state, action.payload] as ITodoItem[];
  },
};

const reducer = handleActions<ITodoItem[], ITodoItem>(
  reducerMap,
  initialState as ITodoItem[],
);

export default reducer;
