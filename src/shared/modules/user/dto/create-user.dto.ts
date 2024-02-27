import {UserStatusType} from '../../../types/index.js';
import {IsEmail, IsIn, IsOptional, IsString, Length} from 'class-validator';
import {USER_STATUS} from '../../../../../dist/shared/types/index.js';
import {CreateUserMessages} from './create-user.messages.js';

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsString({ message: CreateUserMessages.username.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.username.lengthField })
  public username: string;

  @IsIn([USER_STATUS.USUAL, USER_STATUS.PRO], {
    message: CreateUserMessages.status.invalidFormat,
  })
  public status: UserStatusType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}

