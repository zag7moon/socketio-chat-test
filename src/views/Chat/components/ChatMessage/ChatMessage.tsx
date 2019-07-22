import React from 'react';
import * as models from '../../../../interfaces';
import './ChatMessage.scss';
import { getAmountUsers } from './utils';

const ChatMessage: React.FC<models.IChatMessage> = ({ action, title, amount }) => {
  return (
    <div className="chat-message">
      {(() => {
        switch (action) {
          case 'USER_JOINED':
            return (
              <p className="chat-message__text">
                {title} joined. {amount && getAmountUsers(amount)}
              </p>
            );
          case 'USER_LEFT':
            return (
              <p className="chat-message__text">
                {title} left us. {amount && getAmountUsers(amount)}
              </p>
            );
          case 'USER_TYPING':
            return <p className="chat-message__text">{title} is typing... </p>;
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default ChatMessage;
