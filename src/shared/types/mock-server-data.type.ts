import {PropertyType} from './property-type.enum.js';
import {Amenities} from './amenities.enum.js';
import {UserStatusType} from './user-status.type.js';
import {City} from './city.enum.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  publicationDates: string[];
  cities: City[];
  imagePreviews: string[];
  photos: string[][];
  premium: boolean[];
  favorites: boolean[];
  ratings: number[];
  houseTypes: PropertyType[];
  countRooms: number[];
  countGuests: number[];
  rentPrices: number[];
  amenities: Amenities[];
  usernames: string[];
  emails: string[];
  avatarPaths: string[];
  status: UserStatusType[]
  countComments: number[];
  locations: [number, number][];
}
