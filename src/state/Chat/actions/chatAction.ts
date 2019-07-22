import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import * as action from './actionTypes';

export const createUser = (user: User) => (dispatch: any) => {
  dispatch({
    type: action.CREATE_USER,
    user
  });
};

export const sendMessage = (message: Message) => (dispatch: any) => {
  dispatch({
    message,
    type: action.SEND_MESSAGE
  });
};

export const getMessage = (message: Message) => (dispatch: any) => {
  dispatch({
    message,
    type: action.GET_MESSAGE
  });
};

export const userTyping = () => (dispatch: any) => {
  dispatch({ type: action.USER_TYPING });
};

export const userStopTyping = () => (dispatch: any) => {
  dispatch({ type: action.USER_STOP_TYPING });
};

export const clearUserAction = () => (dispatch: any) => {
  dispatch({ type: action.CLEAR_USER_ACTION_MESSAGE });
};

export const userActionMessage = (message: { user: User; actionType: string }) => (dispatch: any) => {
  dispatch({
    message,
    type: action.USER_ACTION_MESSAGE
  });
};
