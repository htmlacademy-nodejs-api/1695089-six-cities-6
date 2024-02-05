import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {AMENITIES, AmenitiesType, HOUSE_TYPE, HouseType, Location} from '../../types/index.js';
import {UserEntity} from '../user/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    trim: true,
    required: true,
    minlength: [10, 'Minimum title length 10 characters'],
    maxlength: [100, 'Maximum title length 10 characters']
  })
  public title: string;

  @prop({
    type: String,
    trim: true,
    required: true,
    minlength: [20, 'Minimum title length 10 characters'],
    maxlength: [1024, 'Maximum title length 10 characters']
  })
  public description: string;

  @prop({
    type: Date,
    required: true
  })
  public publicationDate: Date;

  @prop({
    type: String,
    required: true
  })
  public city: string;

  @prop({
    type: String,
    required: true,
    trim: true,
    match: [/\.(jpg|png)(\?.*)?$/i, 'Image in .jpg or .png format'],
  })
  public imagePreview: string;

  @prop({
    type: Array<string>,
    required: true,
    default: []
  })
  public photos: string[];

  @prop({
    type: Boolean,
    required: true
  })
  public premium: boolean;

  @prop({
    type: Boolean,
    required: true
  })
  public favorites: boolean;

  @prop({
    type: Number,
    required: true,
    min: [1, 'Minimum rating'],
    max: [5, 'Maximum rating']
  })
  public rating: number;

  @prop({
    type: () => String,
    required: true,
    enum: HOUSE_TYPE
  })
  public houseType: HouseType;

  @prop({
    type: Number,
    required: true,
    min: [1, 'Minimum rooms'],
    max: [8, 'Maximum rooms']
  })
  public countRooms: number;

  @prop({
    type: Number,
    required: true,
    min: [1, 'Minimum guests'],
    max: [10, 'Maximum guests']
  })
  public countGuests: number;

  @prop({
    type: Number,
    required: true,
    min: [100, 'Minimum price'],
    max: [10000, 'Maximum price']
  })
  public rentPrice: number;

  @prop({
    type: Array<AmenitiesType>,
    required: true,
    enum: AMENITIES
  })
  public amenities: AmenitiesType[];

  @prop({
    type: Number,
    default: 0
  })
  public countComments: number;

  @prop({
    type: Number,
    required: true
  })
  public location: Location;

  @prop({
    type: String,
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
