import {Dispatch} from 'react';
import {RootState} from './../index';
import {createAction, Action} from 'redux-actions';
import ApiService from '../../services/api';
import {ITodoItem} from '../../types/index.d';
import {adapter, adapterOfAllData} from '../../adapters';

export const UPDATE_ITEM_UPDATA = 'TODO_ITEM_UPDATA';
export const DONE_TODO_ITEM = 'DONE_TODO_ITEM';
export const CREATE_TODO_ITEM = 'CREATE_TODO_ITEM';
export const SET_TODO_ITEMS = 'SET_TODO_ITEMS';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';

export const LOADING_TODO_ITEMS = 'LOADING_TODO_ITEMS';
export const SET_ERROR_TODO_ITEM = 'SET_ERROR_TODO_ITEM';

export const updateTodoItem = createAction<ITodoItem>(UPDATE_ITEM_UPDATA);
export const donetTodoItem = createAction<ITodoItem>(DONE_TODO_ITEM);
export const createTodoItem = createAction<ITodoItem>(CREATE_TODO_ITEM);
export const deleteTodoItem = createAction<string>(DELETE_TODO_ITEM);
export const loadTodoItem = createAction<boolean>(LOADING_TODO_ITEMS);
export const setErrorTodoItem = createAction<boolean | string>(
  SET_ERROR_TODO_ITEM,
);
export const setTodoItem = createAction<ITodoItem[]>(SET_TODO_ITEMS);

export const fetchTodoItem = () => async (
  dispatch: Dispatch<Action<ITodoItem[] | boolean>>,
  getState: () => RootState,
  api: ApiService,
) => {
  try {
    const userId = getState().auth.user?.id!;
    const todoOfUser = await api.get(userId);
    const jsonData = await todoOfUser?.json();
    const adaptedData = adapterOfAllData(jsonData);
    dispatch(setTodoItem(adaptedData));
    dispatch(loadTodoItem(false));
  } catch (error) {
    console.log('todoOfUser', error);
    dispatch(loadTodoItem(false));
  }
};

export const createTodoOnServer = (newTodo: ITodoItem) => async (
  dispatch: Dispatch<Action<ITodoItem | boolean>>,
  getState: () => RootState,
  api: ApiService,
) => {
  try {
    const token = getState().auth.user?.token!; // todo bad practice
    const userId = getState().auth.user?.id!;
    const response = await api.createProduct(newTodo, token, userId);
    const jsonData = await response?.json();
    const adaptedNewTodo = adapter(newTodo, jsonData.name);
    dispatch(createTodoItem(adaptedNewTodo));
  } catch (error) {
    console.log(error);
  }
};
export const updateTodoOnServer = (updateTodo: Partial<ITodoItem>) => async (
  dispatch: Dispatch<Action<ITodoItem | boolean>>,
  getState: () => RootState,
  api: ApiService,
) => {
  dispatch(loadTodoItem(true));
  try {
    const token = getState().auth.user?.token!; // todo bad practice
    const userId = getState().auth.user?.id!;
    const response = await api.updateProduct(userId, token, updateTodo);
    const jsonData = await response?.json();
    dispatch(updateTodoItem(jsonData));
    dispatch(loadTodoItem(false));
  } catch (error) {
    console.log(error);
    dispatch(loadTodoItem(false));
  }
};

export const deleteTodoOnServer = (todoId: string) => async (
  dispatch: Dispatch<Action<string | boolean>>,
  getState: () => RootState,
  api: ApiService,
) => {
  try {
    const token = getState().auth.user?.token!; // todo bad practice
    const userId = getState().auth.user?.id!;
    await api.deleteTodo(userId, todoId, token);
    dispatch(deleteTodoItem(todoId));
    dispatch(loadTodoItem(false));
  } catch (error) {
    console.log(error);
    dispatch(loadTodoItem(false));
  }
};
