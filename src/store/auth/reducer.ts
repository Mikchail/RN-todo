import { Dispatch } from 'react';
import { handleActions, createAction, Action } from 'redux-actions';
import ApiService from '../../services/api';
import { RootState, Store } from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import { ThunkAction } from 'redux-thunk';

const initialState = {
  user: {
    id: '',
    name: '',
    token: '',
    expiresIn: 0,
  },
  waiting: false,
  error: null,
};

export interface IUser {
  id: string;
  name: string;
  token: string;
  expiresIn: number;
}
// declare let timer: number;
declare let timer: NodeJS.Timeout;

type TReduxThunk<T> = ThunkAction<void, RootState, unknown, Action<T>>

export const authenticate = (userDate: IUser,expirationTime: Date): TReduxThunk<string | IUser> => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expirationTime));
    dispatch(logIn(userDate));
  }
};


const setLogoutTimer = (expirationTime: Date): TReduxThunk<null> => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logOut(null));
    }, new Date(expirationTime).getTime());
  }

};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const saveDataToStorage = (userDate: IUser, expirationDate: Date) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      userDate,
      expiryDate: expirationDate.toISOString()
    })
  );
};



export interface IAuthState {
  user: IUser;
  waiting: boolean;
  error: string | null;
}

const LOGIN_USER = 'LOGIN_USER';
const SINGUP_USER = 'SINGUP_USER';
const USER_WAITING = 'USER_WAITING';
const USER_ERROR = 'USER_ERROR';
const LOGOUT_USER = 'LOGOUT_USER';

export const singUp = createAction<IUser>(SINGUP_USER);
export const logIn = createAction<IUser>(LOGIN_USER);
export const logOut = createAction<null>(LOGOUT_USER);
export const error = createAction<string | null>(USER_ERROR);
export const waiting = createAction<boolean>(USER_WAITING);

export const logOutAndCleanTimer = (): TReduxThunk<null> => (dispatch) => {
  clearLogoutTimer();
  dispatch(logOut(null));
  AsyncStorage.removeItem('userData');
}

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

    const expirationDate = new Date(
      new Date().getTime() + parseInt(json.expiresIn) * 1000
    );
    const userData = {
      name: email,
      id: json.localId,
      token: json.idToken,
      expiresIn: parseInt(json.expiresIn) * 1000,
    }
    saveDataToStorage(userData, expirationDate);
    dispatch(authenticate(userData,expirationDate))
    dispatch(waiting(false));
  } catch (error) {
    console.log(error);
    dispatch(waiting(false));
  }
};


// export const lo

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
  [LOGOUT_USER]: (state: IAuthState, action: Action<null>): IAuthState => ({
    ...state,
    user: initialState.user,
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
