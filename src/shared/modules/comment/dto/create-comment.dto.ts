import {CreateCommentMessages} from './create-comment.messages.js';
import {IsInt, IsMongoId, IsString, Length, Max, Min} from 'class-validator';
import {Rating, TextLengthComment} from '../constants/index.js';


export class CreateCommentDto {

  @IsString({message: CreateCommentMessages.text.invalidFormat})
  @Length(TextLengthComment.Min, TextLengthComment.Max, {message: CreateCommentMessages.text.lengthField})
  public text: string;

  @IsInt({message: CreateCommentMessages.rating.invalidFormat})
  @Min(Rating.Min, {message: CreateCommentMessages.rating.minValue})
  @Max(Rating.Max, {message: CreateCommentMessages.rating.maxValue})
  public rating: number;

  @IsMongoId({message: CreateCommentMessages.offerId.invalidFormat})
  public offerId: string;

  public userId: string;
}
