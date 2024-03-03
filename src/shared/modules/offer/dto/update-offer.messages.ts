import {
  CountGuests,
  CountRooms,
  MIN_COUNT_PHOTOS,
  OfferDescriptionLength,
  OfferTitleLength, RentPrice
} from '../constants/index.js';

export const UpdateOfferValidationMessage = {
  title: {
    minLength: `Minimum title length must be ${OfferTitleLength.Min}`,
    maxLength: `Maximum title length must be ${OfferTitleLength.Max}`,
  },
  description: {
    minLength: `Minimum description length must be ${OfferDescriptionLength.Min}`,
    maxLength: `Maximum description length must be ${OfferDescriptionLength.Max}`,
  },
  city: {
    invalidFormat: 'City must be one of: Paris, Cologne, Brussels, Amsterdam, Hamburg, Dusseldorf',
  },
  imagePreview: {
    isUrl: 'imagePreview must be a valid URL',
    matches: 'The image must include an extension.jpg or .png',
  },
  photos: {
    invalidFormat: 'Photos must be an array',
    ArrayMinSize: `Photos must contain exactly ${MIN_COUNT_PHOTOS} images`,
    ArrayMaxSize: `Photos must contain exactly ${MIN_COUNT_PHOTOS} images`,
  },
  premium: {
    invalidFormat: 'premium must be a boolean',
  },
  houseType: {
    invalidFormat: 'houseType must be apartment, house, room or hotel',
  },
  countRooms: {
    invalidFormat: 'countRooms must be an integer',
    minValue: `Min length for countRooms path is ${CountRooms.Min}`,
    maxValue: `Max length for countRooms path is ${CountRooms.Max}`,
  },
  countGuests: {
    invalidFormat: 'countGuests must be an integer',
    minValue: `Min length for countGuests path is ${CountGuests.Min}`,
    maxValue: `Max length for countGuests path is ${CountGuests.Max}`,
  },
  rentPrice: {
    invalidFormat: 'rentPrice cost must be an integer',
    minValue: `Minimum rentPrice is ${RentPrice.Min}`,
    maxValue: `Maximum rentPrice is ${RentPrice.Max}`,
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array and type must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  location: {
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number',
  },
};
