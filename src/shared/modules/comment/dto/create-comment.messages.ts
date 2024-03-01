import {Rating, TextLengthComment} from '../constants/index.js';

export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: `min length is ${TextLengthComment.Min}, max is ${TextLengthComment.Max}`
  },
  rating: {
    invalidFormat: 'rating must be an integer',
    minValue: `Min length for rating path is ${Rating.Min}`,
    maxValue: `Max length for rating path is ${Rating.Max}`,
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  },
} as const;
