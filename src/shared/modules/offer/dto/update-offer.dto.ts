import {Amenities, PropertyType, City} from '../../../types/index.js';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean, IsEnum,
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
import {UpdateOfferValidationMessage} from './update-offer.messages.js';
import {
  CountGuests,
  CountRooms,
  MIN_COUNT_PHOTOS,
  OfferDescriptionLength,
  OfferTitleLength, RentPrice
} from '../constants/index.js';
import {LocationDto} from './create-offer.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(OfferTitleLength.Min, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(OfferTitleLength.Max, {message: UpdateOfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @MinLength(OfferDescriptionLength.Min, {message: UpdateOfferValidationMessage.description.minLength})
  @MaxLength(OfferDescriptionLength.Max, {message: UpdateOfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsEnum(City,
    {
      message: UpdateOfferValidationMessage.city.invalidFormat,
    },
  )
  public city?: City;

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
  @ArrayMinSize(MIN_COUNT_PHOTOS, {message: UpdateOfferValidationMessage.photos.ArrayMinSize})
  @ArrayMaxSize(MIN_COUNT_PHOTOS, {message: UpdateOfferValidationMessage.photos.ArrayMaxSize})
  public photos?: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.premium.invalidFormat})
  public premium?: boolean;

  @IsOptional()
  @IsEnum(PropertyType, {
    message: UpdateOfferValidationMessage.houseType.invalidFormat,
  })
  public houseType?: PropertyType;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.countRooms.invalidFormat})
  @Min(CountRooms.Min, {message: UpdateOfferValidationMessage.countRooms.minValue})
  @Max(CountRooms.Max, {message: UpdateOfferValidationMessage.countRooms.maxValue})
  public countRooms?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.countGuests.invalidFormat})
  @Min(CountGuests.Min, {message: UpdateOfferValidationMessage.countGuests.minValue})
  @Max(CountGuests.Max, {message: UpdateOfferValidationMessage.countGuests.maxValue})
  public countGuests?: number;

  @IsOptional()
  @IsInt({message: UpdateOfferValidationMessage.rentPrice.invalidFormat})
  @Min(RentPrice.Min, {message: UpdateOfferValidationMessage.rentPrice.minValue})
  @Max(RentPrice.Max, {message: UpdateOfferValidationMessage.rentPrice.maxValue})
  public rentPrice?: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.amenities.invalidFormat})
  @IsEnum(Amenities,
    {
      each: true,
      message: UpdateOfferValidationMessage.amenities.invalidFormat,
    },
  )
  public amenities?: Amenities[];

  @IsOptional()
  @ValidateNested()
  public location?: LocationDto;
}
