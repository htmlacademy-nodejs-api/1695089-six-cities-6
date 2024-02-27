export const CreateUserMessages = {
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatarPath: {
    invalidFormat: 'avatarPath is required',
  },
  username: {
    invalidFormat: 'username is required',
    lengthField: 'min length is 1, max is 15',
  },
  status: {
    invalidFormat: 'status must be usual or pro',
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12',
  },
} as const;
