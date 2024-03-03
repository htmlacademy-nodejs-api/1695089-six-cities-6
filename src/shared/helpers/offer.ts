import {Amenities, PropertyType, Offer, UserStatusType, City} from '../types/index.js';

export function createOffer(offerData: string): Offer {

  const [
    title,
    description,
    publicationDate,
    city,
    imagePreview,
    photos,
    premium,
    favorites,
    houseType,
    countRooms,
    countGuests,
    rentPrice,
    amenities,
    username,
    email,
    avatarPath,
    status,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: city as City,
    imagePreview,
    photos: photos.split(';'),
    premium: JSON.parse(premium),
    favorites: JSON.parse(favorites),
    houseType: houseType as PropertyType,
    countRooms: Number.parseInt(countRooms, 10),
    countGuests: Number.parseInt(countGuests, 10),
    rentPrice: Number.parseInt(rentPrice, 10),
    amenities: amenities.split(';') as Amenities[],
    user: {
      username,
      email,
      avatarPath,
      status: status as UserStatusType
    },
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    }
  };
}
