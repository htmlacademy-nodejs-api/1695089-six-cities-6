import {AMENITIES, AmenitiesType, HOUSE_TYPE, HouseType, Location} from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
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
import {CITIES, CityType} from '../../../types/city.type.js';
import {UpdateOfferValidationMessage} from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferValidationMessage.description.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsIn(
    [CITIES.Paris, CITIES.Cologne, CITIES.Brussels, CITIES.Amsterdam, CITIES.Hamburg, CITIES.Dusseldorf],
    {
      message: UpdateOfferValidationMessage.city.invalidFormat,
    },
  )
  public city?: CityType;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: UpdateOfferValidationMessage.imagePreview.isUrl,
    },
  )
  @Matches(/\.(jpg|png)(\?.*)?$/i, {
    message: UpdateOfferValidationMessage.imagePreview.matches,
  })
  public imagePreview?: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.photos.invalidFormat})
  @ArrayMinSize(6, {message: UpdateOfferValidationMessage.photos.ArrayMinSize})
  @ArrayMaxSize(6, {message: UpdateOfferValidationMessage.photos.ArrayMaxSize})
  public photos?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.isPremium.invalidFormat})
  public premium?: boolean;

  @IsOptional()
  @IsIn([HOUSE_TYPE.House, HOUSE_TYPE.Apartment, HOUSE_TYPE.Hotel, HOUSE_TYPE.Room], {
    message: UpdateOfferValidationMessage.houseType.invalidFormat,
  })
  public houseType?: HouseType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.countRooms.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.countRooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.countRooms.maxValue})
  public countRooms?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.countGuests.invalidFormat})
  @Min(1, {message: UpdateOfferValidationMessage.countGuests.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.countGuests.maxValue})
  public countGuests?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.rentPrice.invalidFormat})
  @Min(100, {message: UpdateOfferValidationMessage.rentPrice.minValue})
  @Max(100000, {message: UpdateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.amenities.invalidFormat})
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
      message: UpdateOfferValidationMessage.amenities.invalidFormat,
    },
  )
  public amenities?: AmenitiesType[];

  @IsOptional()
  @ValidateNested()
  public location?: Location;
}
