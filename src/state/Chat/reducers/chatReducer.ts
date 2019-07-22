import * as models from '../../../interfaces';
import { Message } from '../../../models/Message';
import { User } from '../../../models/User';
import * as act from '../actions/actionTypes';

interface IChatState {
  messages: models.IMessagesItems[];
  user: User;
}

const initialState: IChatState = {
  messages: [],
  user: { username: '' }
};

export default (state = initialState, action: { user: User; type: string; message: Message }) => {
  switch (action.type) {
    case act.CREATE_USER:
      return { ...state, user: action.user };

    case act.SEND_MESSAGE:
      return { ...state, messages: [action.message, ...state.messages] };

    case act.GET_MESSAGE:
      return { ...state, messages: [action.message, ...state.messages] };

    case act.USER_ACTION_MESSAGE:
      return { ...state, messages: [action.message, ...state.messages] };

    case act.CLEAR_USER_ACTION_MESSAGE:
      const updatedMessages = state.messages.filter(item => item.actionType !== 'USER_TYPING');
      return { ...state, messages: updatedMessages };

    default:
      return state;
  }
};
