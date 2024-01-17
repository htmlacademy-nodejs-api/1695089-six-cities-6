import {FileReader} from './file-reader.interface.js';
import {readFileSync} from 'node:fs';
import {AmenitiesType, HouseType, Offer, UserStatusType} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {
  }

  public read() {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData.split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map((
        [
          title,
          description,
          publicationDate,
          city,
          imagePreview,
          photos,
          premium,
          favorites,
          rating,
          houseType,
          countRooms,
          countGuests,
          rentPrice,
          amenities,
          username,
          email,
          avatarPath,
          status,
          countComments,
          latitude,
          longitude
        ]) => ({
        title,
        description,
        publicationDate,
        city,
        imagePreview,
        photos: photos.split(';'),
        premium: JSON.parse(premium),
        favorites: JSON.parse(favorites),
        rating: Number.parseFloat(rating),
        houseType: houseType as HouseType,
        countRooms: Number.parseInt(countRooms, 10),
        countGuests: Number.parseInt(countGuests, 10),
        rentPrice: Number.parseInt(rentPrice, 10),
        amenities: amenities.split(';') as AmenitiesType[] ,
        user: {
          username,
          email,
          avatarPath,
          status: status as UserStatusType
        },
        countComments: Number.parseInt(countComments, 10),
        location: {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        }
      }));
  }
}
