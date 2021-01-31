import {Dispatch} from 'react';
import {handleActions, createAction, Action, ReducerMapValue} from 'redux-actions';
import ApiService from '../../api';
import {Store} from '../index';

const initialState = {
  user: null,
  waiting: false,
};

export interface IUser {
  user: {
    id: string;
    name: string;
  } | null;
  waiting: boolean;
}
const LOGIN_USER = 'LOGIN_USER';
const SINGUP_USER = 'SINGUP_USER';
const USER_WAITING = 'USER_WAITING';

export const singUp = createAction<Partial<IUser>>(SINGUP_USER);
export const logIn = createAction<Partial<IUser>>(LOGIN_USER);
export const waiting = createAction<Partial<IUser>>(USER_WAITING);

export const singUpToServer = (email: string, password: string) => async (
  dispatch: Dispatch<any>,
  getState: Store,
  api: ApiService,
) => {
  dispatch(waiting({waiting: true}));

  try {
    const response = await api.signUp(email, password);
    const json = await response.json();
    // singUp(response)
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      throw new Error(message);
    }

    dispatch(
      singUp({
        user: {
          name: email,
          id: json.idToken,
        },
      }),
    );
    dispatch(waiting({waiting: false}));
  } catch (error) {
    dispatch(waiting({waiting: false}));
  }
};

export const loginToServer = (email: string, password: string) => async (
  dispatch: Dispatch<any>,
  getState: Store,
  api: ApiService,
) => {
  dispatch(waiting({waiting: true}));
  try {
    const response = await api.login(email, password);
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      throw new Error(message);
    }
    const json = await response.json();
    console.log(json);
    
    dispatch(
      logIn({
        user: {
          name: email,
          id: json.idToken,
        },
      }),
    );
    dispatch(waiting({waiting: false}));
  } catch (error) {
    console.log(error)
    dispatch(waiting({waiting: false}));
  }
};

const reducerMap: ReducerMapValue<IUser,IUser> = {
  [SINGUP_USER]: (state: IUser, action: Action<IUser>): IUser => ({
    ...state,
    ...action.payload,
  }),
  [LOGIN_USER]: (state: IUser, action: Action<IUser>): IUser => ({
    ...state,
    ...action.payload,
  }),
  [USER_WAITING]: (state: IUser, action: Action<IUser>): IUser => ({
    ...state,
    ...action.payload,
  }),
};

const reducer = handleActions<IUser>(reducerMap, initialState);

export default reducer;
