import { Expose } from 'class-transformer';
import {UserStatusType} from '../../../types/index.js';

export class UserRdo {
  @Expose()
  public email: string ;

  @Expose()
  public avatarPath: string;

  @Expose()
  public status: UserStatusType;

  @Expose()
  public username: string;
}
