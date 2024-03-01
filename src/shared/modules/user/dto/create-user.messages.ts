import {UserNameLength, UserPasswordLength} from '../constants/index.js';

export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatarPath: {
    invalidFormat: 'avatarPath is required',
  },
  username: {
    invalidFormat: 'username is required',
    lengthField: `min length is ${UserNameLength.Min}, max is ${UserNameLength.Min}`,
  },
  status: {
    invalidFormat: 'status must be usual or pro',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${UserPasswordLength.Min}, max is ${UserPasswordLength.Max}`,
  },
} as const;
