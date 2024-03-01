export const UserNameLength = {
  Min: 1,
  Max: 15,
} as const;

export const UserPasswordLength = {
  Min: 6,
  Max: 12,
} as const;

export const DEFAULT_AVATAR_FILE_NAME = 'avatar.svg';

export const PathUser = {
  Register: '/register',
  Login: '/login',
  Logout: '/logout',
  AddAvatar: '/:userId/avatar'
} as const;
