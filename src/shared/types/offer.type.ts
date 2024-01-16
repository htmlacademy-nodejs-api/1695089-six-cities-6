import {HouseType} from './house.type.js';
import {AmenitiesType} from './amenities.type.js';
import {User} from './user.type.js';
import {Location} from './location.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: string;
  city: string;
  imagePreview: string;
  photos: string;
  premium: boolean;
  favorites: boolean;
  rating: number;
  houseType: HouseType;
  countRooms: number;
  countGuests: number;
  rentPrice: number;
  amenities: AmenitiesType[];
  user: User;
  location: Location;
}
