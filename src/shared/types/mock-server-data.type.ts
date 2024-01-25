import {HouseType} from './house.type.js';
import {AmenitiesType} from './amenities.type.js';
import {UserStatusType} from './user-status.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  publicationDates: string[];
  cities: string[];
  imagePreviews: string[];
  photos: string[][];
  premium: boolean[];
  favorites: boolean[];
  ratings: number[];
  houseTypes: HouseType[];
  countRooms: number[];
  countGuests: number[];
  rentPrices: number[];
  amenities: AmenitiesType[];
  usernames: string[];
  emails: string[];
  avatarPaths: string[];
  status: UserStatusType[]
  countComments: number[];
  locations: [number, number][];
}
