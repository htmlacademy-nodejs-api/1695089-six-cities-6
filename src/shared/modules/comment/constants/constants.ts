export const TextLengthComment = {
  Min: 5,
  Max: 1024
} as const;

export const Rating = {
  Min: 1,
  Max: 5
} as const;

export const PathComments = {
  create: '/',
  findById: '/:offerId'
} as const;

export const DEFAULT_COMMENT_COUNT = 50;
