import { User } from './User';

export interface IMessage {
  message: string;
  user: User;
}

export class Message implements IMessage {
  public message: string;
  public user: User;

  constructor(userData: IMessage) {
    // Processing of the passed object
    // Validation and so on
    this.message = userData.message.trim();
    this.user = userData.user;
  }
}
