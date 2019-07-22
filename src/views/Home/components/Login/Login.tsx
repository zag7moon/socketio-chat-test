import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { User } from '../../../../models/User';
import { createUser } from '../../../../state/Chat/actions/chatAction';
import './Login.scss';
import { isUserNameValid } from './utils';

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [username, setUsername] = useState<string>('');
  const dispatch = useDispatch();

  const handleChangeLogin = () => {
    const user: User = new User({ username });

    if (isUserNameValid(username)) {
      dispatch(createUser(user));
      history.push('/chat');
    }
  };

  // todo add validation error message
  // todo add keyboard control

  return (
    <div className="login-section">
      <div className="login-section__content">
        <p className="login-section__title">What is your name?</p>
        <div className="login-section__login-bar">
          <FormControl className="login-section__form-control">
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input id="component-simple" value={username} onChange={e => setUsername(e.target.value)} />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            className="login-section__button"
            onClick={() => handleChangeLogin()}>
            GO
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
