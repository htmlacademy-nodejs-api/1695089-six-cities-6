import {User, UserStatusType} from '../types/index.js';

export class UserEntity implements User {
  public username: string;
  public email: string;
  public avatarPath?: string;
  public status: UserStatusType;
}
