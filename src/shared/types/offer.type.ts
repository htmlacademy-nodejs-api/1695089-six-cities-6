import {PropertyType} from './property-type.enum.js';
import {Amenities} from './amenities.enum.js';
import {User} from './user.type.js';
import {Location} from './location.type.js';
import {City} from './city.enum.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  imagePreview: string;
  photos: string[];
  premium: boolean;
  favorites: boolean;
  rating?: number;
  houseType: PropertyType;
  countRooms: number;
  countGuests: number;
  rentPrice: number;
  amenities: Amenities[];
  user: User;
  countComments?: number;
  location: Location;
}
