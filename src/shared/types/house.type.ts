export const HOUSE_TYPE = {
  Room: 'Room',
  Apartment: 'Apartment',
  House: 'House',
  Hotel: 'Hotel',
} as const;

export type HouseType = typeof HOUSE_TYPE[keyof typeof HOUSE_TYPE];
