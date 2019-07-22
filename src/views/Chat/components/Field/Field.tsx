import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as models from '../../../../interfaces';
import { Message } from '../../../../models/Message';
import { sendMessage, userStopTyping, userTyping } from '../../../../state/Chat/actions/chatAction';
import './Field.scss';
import { isMessageValid } from './utils';

const Field: React.FC = () => {
  const [message, setMessage] = useState('');
  const result = useSelector((state: models.IChatStore) => state);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const onUserTyping = () => {
    dispatch(userTyping());
  };

  useEffect(() => {
    const field = document.getElementById('inputField');
    field!.addEventListener('focus', onUserTyping);
    return () => {
      field!.addEventListener('blur', onUserTyping);
    };
  }, []);

  const handleChangeLogin = () => {
    const userMessage: Message = new Message({ user: result.chatReducer.user, message });

    if (isMessageValid(message)) {
      dispatch(sendMessage(userMessage));
      dispatch(userStopTyping());
      setMessage('');
    }
  };

  // todo add validation error message
  // todo add keyboard control

  return (
    <div className="field-section">
      <FormControl className="field-section__form-control">
        <InputLabel htmlFor="inputField">Your message</InputLabel>
        <Input id="inputField" value={message} onChange={handleChange} />
      </FormControl>

      <Button variant="contained" color="primary" className="field-section__button" onClick={() => handleChangeLogin()}>
        Send
      </Button>
    </div>
  );
};

export default Field;
