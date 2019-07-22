import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import {
  CREATE_USER,
  SEND_MESSAGE,
  USER_ACTION_MESSAGE,
  USER_STOP_TYPING,
  USER_TYPING
} from '../../Chat/actions/actionTypes';
import { clearUserAction, getMessage, userActionMessage } from '../../Chat/actions/chatAction';
import { CONNECT_SOCKET } from '../actions/actionTypes';
import { connectionChanged } from '../actions/socketAction';
import Socket from './Socket';

const socketMiddleware = (store: any) => {
  const onConnectionChange = (isConnected: boolean) => {
    store.dispatch(connectionChanged(isConnected));
  };

  const onIncomingMessage = (message: Message) => store.dispatch(getMessage(message));

  const onUserAdd = (message: { user: User; actionType: string }) => store.dispatch(userActionMessage(message));

  const onUserStopTyping = () => store.dispatch(clearUserAction());

  const socket = new Socket(onConnectionChange, onIncomingMessage, onUserAdd, onUserStopTyping);

  return (next: any) => (action: any) => {
    const messageState = store.getState().chatReducer;
    const socketState = store.getState().socketReducer;

    switch (action.type) {
      case CONNECT_SOCKET:
        socket.connect(messageState.user, process.env.PORT || socketState.port);
        break;

      case SEND_MESSAGE:
        socket.sendMessage(action.message);
        break;

      case CREATE_USER:
        socket.createUser(action.user);
        break;

      case USER_ACTION_MESSAGE:
        break;

      case USER_TYPING:
        socket.userTyping();
        break;

      case USER_STOP_TYPING:
        socket.userStopTyping();
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
