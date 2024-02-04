import {User, UserStatusType} from '../types/index.js';
import {getModelForClass, prop, defaultClasses} from '@typegoose/typegoose';

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({type: String, required: true})
  public username: string;

  @prop({type: String, required: true, unique: true})
  public email: string;

  @prop({type: String, required: false, default: ''})
  public avatarPath?: string;

  @prop({type: String, required: true})
  public status: UserStatusType;
}

export const UserModel = getModelForClass(UserEntity);
