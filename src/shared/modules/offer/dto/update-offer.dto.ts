import {AmenitiesType, HouseType, Location} from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publicationDate?: Date;
  public city?: string;
  public imagePreview?: string;
  public photos?: string[];
  public premium?: boolean;
  public favorites?: boolean;
  public houseType?: HouseType;
  public countRooms?: number;
  public countGuests?: number;
  public rentPrice?: number;
  public amenities?: AmenitiesType[];
  public location?: Location;
}
