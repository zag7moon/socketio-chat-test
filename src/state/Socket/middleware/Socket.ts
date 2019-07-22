import * as io from 'socket.io-client';
import { User } from '../../../models/User';

const EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'new message',
  USER_ADD: 'add user',
  USER_JOIN: 'user joined',
  USER_LEFT: 'user left',
  USER_STOP_TYPING: 'stop typing',
  USER_TYPING: 'typing'
};

export default class Socket {
  public user: string;
  public port: string;
  private onChange: (isConnected: boolean) => void;
  private onMessage: (message: { user: User; message: string }) => void;
  private onUserAdd: (message: { user: User; actionType: string }) => void;
  private onUserStopTyping: () => void;
  private socket: any;

  constructor(
    onChange: (isConnected: boolean) => void,
    onMessage: (message: { user: User; message: string }) => any,
    onUserAdd: (message: { user: User; actionType: string }) => any,
    onUserStopTyping: () => void
  ) {
    this.onChange = onChange;
    this.onMessage = onMessage;
    this.onUserAdd = onUserAdd;
    this.onUserStopTyping = onUserStopTyping;
    this.socket = '';
    this.user = '';
    this.port = '';
  }

  public connect = (user: string, port: string) => {
    this.user = user;
    this.port = port;

    const host = `http://localhost:${port}`; // Running from local network
    this.socket = io.connect(host);
    // this.socket = io.connect(); // Running from Heroku

    this.socket.on(EVENTS.CONNECT, this.onConnected);
  };

  public onConnected = () => {
    // Whenever the server emits 'new message', update the chat body
    this.socket.on(EVENTS.MESSAGE, this.onMessage);

    // Whenever the server emits 'user joined', log it in the chat body
    this.socket.on(EVENTS.USER_JOIN, this.onUserAdd);

    // Whenever the server emits 'typing', show the typing message
    this.socket.on(EVENTS.USER_TYPING, this.onUserAdd);

    // Whenever the server emits 'user left', log it in the chat body
    this.socket.on(EVENTS.USER_LEFT, this.onUserAdd);

    // Whenever the server emits 'stop typing', kill the typing message
    this.socket.on(EVENTS.USER_STOP_TYPING, this.onUserStopTyping);

    this.onChange(true);
  };

  public sendMessage = (message: { user: string; message: string }) => {
    if (typeof this.socket.emit === 'function') {
      // Tell server to execute 'new message' and send along one parameter
      this.socket.emit(EVENTS.MESSAGE, message);
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  public createUser = (user: User) => {
    if (typeof this.socket.emit === 'function') {
      // Tell the server your username
      this.socket.emit(EVENTS.USER_ADD, user);
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  public userTyping = () => {
    if (typeof this.socket.emit === 'function') {
      // Tell the server the user types the message
      this.socket.emit(EVENTS.USER_TYPING);
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  public userStopTyping = () => {
    if (typeof this.socket.emit === 'function') {
      // Tell the server the user has finished typing a message
      this.socket.emit(EVENTS.USER_STOP_TYPING);
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  public disconnect = () => this.socket.close();
}
