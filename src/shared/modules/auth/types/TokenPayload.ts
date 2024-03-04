export type TokenPayload = {
  email: string;
  username: string;
  id: string;
};

export const TokenPayloadName = {
  Id: 'id',
  Username: 'username',
  Email: 'email'
} as const
