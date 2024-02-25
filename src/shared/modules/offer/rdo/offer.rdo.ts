import {Expose} from 'class-transformer';

export class OfferRdo {

  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicationDate: string;

  @Expose()
  public city: string;

  @Expose()
  public imagePreview: string;

  @Expose()
  public photos: string;

  @Expose()
  public premium: string;

  @Expose()
  public favorites: string;

  @Expose()
  public houseType: string;

  @Expose()
  public countRooms: string;

  @Expose()
  public countGuests: string;

  @Expose()
  public rentPrice: string;

  @Expose()
  public amenities: string;

  @Expose()
  public totalRating: string;

  @Expose()
  public commentCount: string;

  @Expose()
  public location: string;

  @Expose()
  public userId: string;
}
