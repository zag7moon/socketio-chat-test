import { User } from '../models/User';

export interface IChatActionResult {
  result?: string;
  user: User;
  messages: IMessagesItems[];
}

export interface IChatStore {
  chatReducer: IChatActionResult;
}

export interface IMessagesItems {
  user: User;
  message: string;
  actionType?: string;
  numUsers?: number;
}

export interface IUserMessage {
  title: string;
  message: string;
  key: number;
}

export interface IChatMessage {
  title: string;
  action?: string;
  amount?: number;
  key: number;
}
