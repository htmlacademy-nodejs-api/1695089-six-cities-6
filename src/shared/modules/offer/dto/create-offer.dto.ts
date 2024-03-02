import {Amenities, PropertyType, Location, City} from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray, IsBoolean,
  IsDateString, IsEnum,
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
import {
  CountGuests,
  CountRooms,
  MIN_COUNT_PHOTOS,
  OfferDescriptionLength,
  OfferTitleLength,
  RentPrice
} from '../constants/index.js';

export class CreateOfferDto {
  @MinLength(OfferTitleLength.Min, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(OfferTitleLength.Max, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(OfferDescriptionLength.Min, {message: CreateOfferValidationMessage.description.minLength})
  @MaxLength(OfferDescriptionLength.Max, {message: CreateOfferValidationMessage.description.maxLength})
  public description: string;

  @IsOptional()
  @IsDateString({}, {message: CreateOfferValidationMessage.publicationDate.invalidFormat})
  public publicationDate: Date;

  @IsEnum(City, {
    message: CreateOfferValidationMessage.city.invalidFormat,
  },
  )
  public city: City;

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

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(MIN_COUNT_PHOTOS, {message: CreateOfferValidationMessage.photos.ArrayMinSize})
  @ArrayMaxSize(MIN_COUNT_PHOTOS, {message: CreateOfferValidationMessage.photos.ArrayMaxSize})
  public photos: string[];

  @IsBoolean({message: CreateOfferValidationMessage.isPremium.invalidFormat})
  public premium: boolean;

  @IsEnum(PropertyType, {message: CreateOfferValidationMessage.houseType.invalidFormat,})
  public houseType: PropertyType;

  @IsInt({message: CreateOfferValidationMessage.countRooms.invalidFormat})
  @Min(CountRooms.Min, {message: CreateOfferValidationMessage.countRooms.minValue})
  @Max(CountRooms.Max, {message: CreateOfferValidationMessage.countRooms.maxValue})
  public countRooms: number;

  @IsInt({message: CreateOfferValidationMessage.countGuests.invalidFormat})
  @Min(CountGuests.Min, {message: CreateOfferValidationMessage.countGuests.minValue})
  @Max(CountGuests.Max, {message: CreateOfferValidationMessage.countGuests.maxValue})
  public countGuests: number;

  @IsInt({message: CreateOfferValidationMessage.rentPrice.invalidFormat})
  @Min(RentPrice.Min, {message: CreateOfferValidationMessage.rentPrice.minValue})
  @Max(RentPrice.Max, {message: CreateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice: number;

  @IsArray({message: CreateOfferValidationMessage.amenities.invalidFormat})
  @IsEnum(Amenities, {
    each: true,
    message: CreateOfferValidationMessage.amenities.invalidFormat,
  })
  public amenities: Amenities[];

  @ValidateNested()
  public location: Location;

  public userId: string;
}
