import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as models from '../../../../interfaces';
import { ChatMessage, UserMessage } from '../index';
import './ChatRoom.scss';

const ChatRoom: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<models.IMessagesItems[]>([]);
  const { chatReducer } = useSelector((state: models.IChatStore) => state);

  useEffect(() => {
    const { messages } = chatReducer;
    setChatMessages(messages);
  }, [chatReducer.messages]);

  return (
    <div className="chat-room">
      {chatMessages.map((item: models.IMessagesItems, index: number) => {
        if (item.actionType) {
          return <ChatMessage key={index} action={item.actionType} title={item.user.username} amount={item.numUsers} />;
        } else {
          return <UserMessage key={index} message={item.message} title={item.user.username} />;
        }
      })}
    </div>
  );
};

export default ChatRoom;
