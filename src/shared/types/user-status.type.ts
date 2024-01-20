export const USER_STATUS = {
  USUAL: 'usual',
  PRO: 'pro'
} as const;

export type UserStatusType = typeof USER_STATUS[keyof typeof USER_STATUS]
