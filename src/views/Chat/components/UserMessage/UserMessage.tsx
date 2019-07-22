import React from 'react';
import * as models from '../../../../interfaces';
import { COLOR_LIBRARY } from './constans';
import './UserMessage.scss';

const UserMessage: React.FC<models.IUserMessage> = ({ message, title }) => {
  const colorNumber: number = (title && title.length) || 0;
  return (
    <div className="user-message">
      <p className="user-message__title" style={{ color: COLOR_LIBRARY[colorNumber] }}>
        {title ? title : 'guest'}
      </p>
      <p className="user-message__text">{message}</p>
    </div>
  );
};
export default UserMessage;
