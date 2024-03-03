import {UserStatusType} from '../../../types/index.js';
import {IsEmail, IsIn, IsString, Length} from 'class-validator';
import {USER_STATUS} from '../../../../../dist/shared/types/index.js';
import {CreateUserMessages} from './create-user.messages.js';
import {UserNameLength, UserPasswordLength} from '../constants/index.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(UserNameLength.Min, UserNameLength.Max, { message: CreateUserMessages.username.lengthField })
  public username: string;

  @IsIn([USER_STATUS.USUAL, USER_STATUS.PRO], {
    message: CreateUserMessages.status.invalidFormat,
  })
  public status: UserStatusType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, { message: CreateUserMessages.password.lengthField })
  public password: string;
}

