import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import chatReducer from './Chat/reducers/chatReducer';
import socketMiddleware from './Socket/middleware';
import socketReducer from './Socket/reducers/socketReducer';

const rootReducer = combineReducers({
  chatReducer,
  socketReducer
});

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(socketMiddleware, thunk)));
  // return createStore(rootReducer, composeEnhancers(applyMiddleware(socketMiddleware)));
}
