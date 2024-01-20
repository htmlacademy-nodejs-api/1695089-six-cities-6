import {UserStatusType} from './user-status.type.js';

export type User = {
  username: string;
  email: string;
  avatarPath?: string;
  status: UserStatusType
}
