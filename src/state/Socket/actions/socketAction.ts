import * as action from './actionTypes';

export const connectionChanged = (isConnected: boolean) => {
  return {
    connected: isConnected,
    isError: false,
    type: action.CONNECTION_CHANGED
  };
};

export const connectSocket = () => {
  return {
    type: action.CONNECT_SOCKET
  };
};
