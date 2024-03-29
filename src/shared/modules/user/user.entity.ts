import {User, UserStatusType} from '../../types/index.js';
import {getModelForClass, prop, defaultClasses, modelOptions} from '@typegoose/typegoose';
import {createSHA256} from '../../helpers/index.js';
import {Types} from 'mongoose';
import {UserNameLength} from './constants/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    type: String,
    required: true,
    trim: true,
    minlength: [UserNameLength.Min, `Min length for name path is ${UserNameLength.Min}`],
    maxlength: [UserNameLength.Max, `Max length for name path is ${UserNameLength.Max}`],
  })
  public username: string;

  @prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    type: String,
    required: false,
    trim: true,
  })
  public avatarPath?: string;

  @prop({
    type: Types.ObjectId,
    default: [],
  })
  public favoriteOffers: Types.Array<Types.ObjectId>;

  @prop({
    type: String,
    required: true
  })
  public status: UserStatusType;

  @prop({required: true})
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.username = userData.username;
    this.status = userData.status;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
