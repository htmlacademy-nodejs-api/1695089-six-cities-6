import {UserPasswordLength} from '../constants/index.js';

export const LoginUserMessage = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`,
  },
} as const;
