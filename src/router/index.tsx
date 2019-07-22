import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { connectSocket } from '../state/Socket/actions/socketAction';
import { Chat } from '../views/Chat';
import { Home } from '../views/Home';

const TheRouter: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connectSocket());
  }, []);

  return (
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/chat" component={Chat} />
      </div>
    </Router>
  );
};

export default TheRouter;
