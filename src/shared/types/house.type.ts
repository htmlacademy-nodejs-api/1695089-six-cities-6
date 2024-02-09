export const HOUSE_TYPE = {
  Room: 'room',
  Apartment: 'apartment',
  House: 'house',
  Hotel: 'hotel',
} as const;

export type HouseType = typeof HOUSE_TYPE[keyof typeof HOUSE_TYPE];
