import {UserStatusType} from '../../../types/index.js';

export class CreateUserDto {
  public email: string;
  public avatarPath: string;
  public username: string;
  public status: UserStatusType;
  public password: string;
}
