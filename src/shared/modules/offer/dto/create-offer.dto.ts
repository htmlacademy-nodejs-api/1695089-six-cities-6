import {AMENITIES, AmenitiesType, HOUSE_TYPE, HouseType, Location} from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray, IsBoolean,
  IsDateString,
  IsIn,
  IsInt,
  IsOptional,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.messages.js';
import {CITIES, CityType} from '../../../types/city.type.js';

export class CreateOfferDto {
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsOptional()
  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
  public publicationDate: Date;

  @IsIn(
    [CITIES.Paris, CITIES.Cologne, CITIES.Brussels, CITIES.Amsterdam, CITIES.Hamburg, CITIES.Dusseldorf],
    {
      message: CreateOfferValidationMessage.city.invalidFormat,
    },
  )
  public city: CityType;

  @IsUrl(
    {},
    {
      message: CreateOfferValidationMessage.imagePreview.isUrl,
    },
  )
  @Matches(/\.(jpg|png)(\?.*)?$/i, {
    message: CreateOfferValidationMessage.imagePreview.matches,
  })
  public imagePreview: string;

  @IsArray({ message: CreateOfferValidationMessage.photos.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.photos.ArrayMinSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.photos.ArrayMaxSize })
  public photos: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public premium: boolean;

  @IsIn([HOUSE_TYPE.House, HOUSE_TYPE.Apartment, HOUSE_TYPE.Hotel, HOUSE_TYPE.Room], {
    message: CreateOfferValidationMessage.houseType.invalidFormat,
  })
  public houseType: HouseType;

  @IsInt({ message: CreateOfferValidationMessage.countRooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countRooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.countRooms.maxValue })
  public countRooms: number;

  @IsInt({ message: CreateOfferValidationMessage.countGuests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.countGuests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.countGuests.maxValue })
  public countGuests: number;

  @IsInt({ message: CreateOfferValidationMessage.rentPrice.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentPrice.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.rentPrice.maxValue })
  public rentPrice: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsIn(
    [
      AMENITIES.Breakfast,
      AMENITIES.AirConditioning,
      AMENITIES.LaptopFriendlyWorkspace,
      AMENITIES.BabySeat,
      AMENITIES.Washer,
      AMENITIES.Towels,
      AMENITIES.Fridge,
    ],
    {
      each: true,
      message: CreateOfferValidationMessage.amenities.invalidFormat,
    },
  )
  public amenities: AmenitiesType[];

  public userId: string;

  @ValidateNested()
  public location: Location;
}
