export type User = {
  username: string;
  email: string;
  avatarPath?: string;
  password: string;
  status: 'usual' | 'pro'
}
