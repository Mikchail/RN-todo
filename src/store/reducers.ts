import {
  handleActions,
  createAction,
  Action
} from 'redux-actions';
import {ITodoItem} from '../types/index.d';

const initialState = [
  {
    id: '1',
    title: 'Выучить react native',
    isComplite: true,
  },
  {
    id: '2',
    title: 'Выучить латынь',
    isComplite: false,
  },
  {
    id: '3',
    title: 'Выучить typescript',
    isComplite: true,
  },
  {
    id: '33',
    title: 'Выучить английский',
    isComplite: false,
  },
];

const UPDATE_ITEM_UPDATA = 'TODO_ITEM_UPDATA';
const DONE_TODO_ITEM = 'DONE_TODO_ITEM';
const CREATE_TODO_ITEM = 'CREATE_TODO_ITEM';

export const updateTodoItem = createAction<ITodoItem>(UPDATE_ITEM_UPDATA);
export const donetTodoItem = createAction<ITodoItem>(DONE_TODO_ITEM);
export const createTodoItem = createAction<ITodoItem>(CREATE_TODO_ITEM);

const reducerMap = {
  [DONE_TODO_ITEM]: (state: ITodoItem[], action: Action<ITodoItem>) => {
    const newData = [...state];
    if (!action.payload) {
      return state;
    }
    const {payload} = action;

    const elemIndex = state.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      id: newData[elemIndex].id,
      title: newData[elemIndex].title,
      isComplite: !newData[elemIndex].isComplite,
    };
    return newData;
  },
  [UPDATE_ITEM_UPDATA]: (state: ITodoItem[], action: Action<ITodoItem>) => {
    const newData = [...state];
    const {payload} = action;

    const elemIndex = state.findIndex((d) => d.id === payload.id);
    newData[elemIndex] = {
      id: newData[elemIndex].id,
      title: payload.title,
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
