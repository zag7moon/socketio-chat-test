export interface IUser {
  username: string;
  password?: string;
}

export class User implements IUser {
  public username: string;

  constructor(userData: IUser) {
    // Processing of the passed object
    // Validation and so on
    this.username = userData.username.trim();
  }
}
