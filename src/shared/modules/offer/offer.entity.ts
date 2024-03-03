import {defaultClasses, getModelForClass, modelOptions, prop, mongoose, Ref, Severity} from '@typegoose/typegoose';
import {Amenities, Location, PropertyType, City} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {CountGuests, CountRooms, OfferDescriptionLength, OfferTitleLength, RentPrice} from './constants/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    trim: true,
    required: true,
    minlength: [OfferTitleLength.Min, `Minimum title length ${OfferTitleLength.Min} characters`],
    maxlength: [OfferTitleLength.Max, `Maximum title length ${OfferTitleLength.Max} characters`]
  })
  public title: string;

  @prop({
    type: String,
    trim: true,
    required: true,
    minlength: [OfferDescriptionLength.Min, `Minimum description length ${OfferDescriptionLength.Min} characters`],
    maxlength: [OfferDescriptionLength.Max, `Maximum description length ${OfferDescriptionLength.Max} characters`]
  })
  public description: string;

  @prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  public publicationDate: Date;

  @prop({
    type: String,
    enum: City,
    required: true
  })
  public city: City;

  @prop({
    type: String,
    required: true,
    trim: true,
  })
  public imagePreview: string;

  @prop({
    type: String,
    required: true,
    default: [],
  })
  public photos: mongoose.Types.Array<string>;

  @prop({
    type: Boolean,
    required: true
  })
  public premium: boolean;

  @prop({
    type: Boolean,
    required: true,
    default: false
  })
  public favorites: boolean;

  @prop({
    type: () => String,
    required: true,
    enum: PropertyType
  })
  public houseType: PropertyType;

  @prop({
    type: Number,
    required: true,
    min: [CountRooms.Min, `Minimum ${CountRooms.Min} rooms`],
    max: [CountRooms.Max, `Maximum ${CountRooms.Max} rooms`]
  })
  public countRooms: number;

  @prop({
    type: Number,
    required: true,
    min: [CountGuests.Min, `Minimum ${CountGuests.Min} guests`],
    max: [CountGuests.Max, `Maximum ${CountGuests.Max} guests`]
  })
  public countGuests: number;

  @prop({
    type: Number,
    required: true,
    min: [RentPrice.Min, `Minimum ${RentPrice.Min} price`],
    max: [RentPrice.Max, `Maximum ${RentPrice.Max} price`]
  })
  public rentPrice: number;

  @prop({
    type: () => String,
    enum: Amenities,
    required: true,
    default: [],
  })
  public amenities: Amenities[];

  @prop({
    required: true,
  })
  public location: Location;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
