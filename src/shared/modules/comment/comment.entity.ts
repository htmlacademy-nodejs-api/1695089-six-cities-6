import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import {UserEntity} from '../user/index.js';
import {OfferEntity} from '../offer/index.js';
import {Rating, TextLengthComment} from './constants/index.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base{}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {

  @prop({
    type: String,
    required: true,
    minlength: [TextLengthComment.Min, `Minimum text length ${TextLengthComment.Min} characters`],
    maxlength: [TextLengthComment.Max, `Minimum text length ${TextLengthComment.Max} characters`],
    trim: true
  })
  public text: string;

  @prop({
    type: Number,
    required: true,
    min: [Rating.Min, `Minimum ${Rating.Min} rating`],
    max: [Rating.Max, `Maximum ${Rating.Max} rating`]
  })
  public rating: number;

  @prop({
    ref: OfferEntity,
    required: true
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    required: true,
    ref: UserEntity
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
