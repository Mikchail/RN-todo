import {Dispatch} from 'react';
import {handleActions, createAction, Action} from 'redux-actions';
import ApiService from '../../services/api';
import {Store} from '../index';

const initialState = {
  user: {
    id: '',
    name: '',
    token: '',
  },
  waiting: false,
  error: null,
};

export interface IUser {
  id: string;
  name: string;
  token: string;
}

export interface IAuthState {
  user: IUser;
  waiting: boolean;
  error: string | null;
}

const LOGIN_USER = 'LOGIN_USER';
const SINGUP_USER = 'SINGUP_USER';
const USER_WAITING = 'USER_WAITING';
const USER_ERROR = 'USER_ERROR';

export const singUp = createAction<IUser>(SINGUP_USER);
export const logIn = createAction<IUser>(LOGIN_USER);
export const error = createAction<string | null>(USER_ERROR);
export const waiting = createAction<boolean>(USER_WAITING);

export const singUpToServer = (email: string, password: string) => async (
  dispatch: Dispatch<any>,
  getState: Store,
  api: ApiService,
) => {
  dispatch(waiting(true));
  dispatch(error(null));
  try {
    const response = await api.signUp(email, password);
    // singUp(response)
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';
      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      console.log(message);
      dispatch(error(message));
      throw new Error(message);
    }
    const json = await response.json();
    // dispatch(
    //   singUp({
    //     name: email,
    //     id: json.idToken,
    //   }),
    // );
    console.log(json);
    const mail = await api.verificationEmail(json.idToken);
    console.log(mail);
    dispatch(waiting(false));
  } catch (error) {
    dispatch(waiting(false));
  }
};

export const loginToServer = (email: string, password: string) => async (
  dispatch: Dispatch<any>,
  getState: Store,
  api: ApiService,
) => {
  dispatch(waiting(true));
  dispatch(error(null));
  try {
    const response = await api.login(email, password);
    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let message = errorId;
      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }
      dispatch(error(message));
      throw new Error(message);
    }
    const json = await response.json();

    dispatch(
      logIn({
        name: email,
        id: json.localId,
        token: json.idToken,
      }),
    );
    dispatch(waiting(false));
  } catch (error) {
    console.log(error);
    dispatch(waiting(false));
  }
};

const reducerMap = {
  [SINGUP_USER]: (state: IAuthState, action: Action<IUser>): IAuthState => ({
    ...state,
    user: action.payload,
  }),
  [LOGIN_USER]: (state: IAuthState, action: Action<IUser>): IAuthState => ({
    ...state,
    user: action.payload,
  }),
  [USER_WAITING]: (state: IAuthState, action: Action<boolean>): IAuthState => ({
    ...state,
    waiting: action.payload,
  }),
  [USER_ERROR]: (
    state: IAuthState,
    action: Action<string | null>,
  ): IAuthState => ({
    ...state,
    error: action.payload,
  }),
};

const reducer = handleActions<IAuthState, any>(reducerMap, initialState);

export default reducer;
