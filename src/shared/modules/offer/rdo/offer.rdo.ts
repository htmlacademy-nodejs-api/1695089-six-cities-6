import {Expose, Type} from 'class-transformer';
import {Amenities, City, PropertyType} from '../../../types/index.js';
import {UserRdo} from '../../user/index.js';


class LocationRdo {
  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;
}

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicationDate: Date;

  @Expose()
  public city: City;

  @Expose()
  public imagePreview: string;

  @Expose()
  public photos: string[];

  @Expose()
  public premium: boolean;

  @Expose()
  public favorites: boolean;

  @Expose()
  public houseType: PropertyType;

  @Expose()
  public countRooms: number;

  @Expose()
  public countGuests: number;

  @Expose()
  public rentPrice: number;

  @Expose()
  public amenities: Amenities[];

  @Expose()
  public rating: number;

  @Expose()
  public commentCount: number;

  @Expose()
  @Type(() => LocationRdo)
  public location: LocationRdo;

  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;
}
