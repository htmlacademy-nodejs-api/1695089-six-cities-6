import {IsEmail, IsString, Length} from 'class-validator';
import {LoginUserMessage} from './login-user.messages.js';
import {UserPasswordLength} from '../constants/index.js';


export class LoginUserDto {
  @IsEmail({}, { message: LoginUserMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: LoginUserMessage.password.invalidFormat })
  @Length(UserPasswordLength.Min, UserPasswordLength.Max, { message: LoginUserMessage.password.lengthField })
  public password: string;
}
