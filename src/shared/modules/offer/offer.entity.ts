import {defaultClasses, getModelForClass, modelOptions, prop, mongoose, Ref, Severity} from '@typegoose/typegoose';
import {AmenitiesType, HOUSE_TYPE, HouseType, Location} from '../../types/index.js';
import {UserEntity} from '../user/index.js';


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
    required: true,
    default: Date.now,
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
    max: [100000, 'Maximum price']
  })
  public rentPrice: number;

  @prop({
    type: String,
    required: true,
    default: [],
  })
  public amenities: mongoose.Types.Array<AmenitiesType>;

  @prop({
    required: true
  })
  public location: Location;

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

}

export const OfferModel = getModelForClass(OfferEntity);
