import { Expose } from 'class-transformer';
import {UserStatusType} from '../../../types/index.js';

export class UserRdo {
  @Expose()
  public id: string;

  @Expose()
  public email: string ;

  @Expose()
  public username: string;

  @Expose()
  public avatarPath: string;

  @Expose()
  public status: UserStatusType;

}
