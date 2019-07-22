import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as models from '../../interfaces';
import './Chat.scss';
import { ChatRoom, Field } from './components/index';

const Chat: React.FC<RouteComponentProps> = ({ history }) => {
  const { chatReducer } = useSelector((state: models.IChatStore) => state);

  useEffect(() => {
    const { user } = chatReducer;

    if (!user.username) {
      history.push('/');
    }
  }, []);

  return (
    <div className="chat">
      <div className="chat__content">
        <div className="chat__chat-room">
          <ChatRoom />
        </div>
        <div className="chat__input-field">
          <Field />
        </div>
      </div>
    </div>
  );
};

export default Chat;
