export const DEFAULT_OFFER_PREMIUM_COUNT = 3;
export const DEFAULT_OFFER_COUNT = 60;

export const MIN_COUNT_PHOTOS = 6;

export const OfferTitleLength = {
  Min: 10,
  Max: 100
} as const;

export const OfferDescriptionLength = {
  Min: 20,
  Max: 1024
} as const;

export const CountRooms = {
  Min: 1,
  Max: 8
} as const;

export const CountGuests = {
  Min: 1,
  Max: 10
} as const;

export const RentPrice = {
  Min: 100,
  Max: 100000
} as const;

export const PathOffer = {
  Index: '/',
  Premium: '/premium',
  Favorites: '/favorites',
  toggleFavorites: '/:offerId/favorites',
  Create: '/',
  Update: '/:offerId',
  Delete: '/:offerId',
  Show: '/:offerId',
  AddAvatar: '/:userId/avatar'
} as const;
