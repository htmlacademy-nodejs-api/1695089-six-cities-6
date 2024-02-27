export const UpdateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
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
    ArrayMinSize: 'Photos must contain exactly 6 images',
    ArrayMaxSize: 'Photos must contain exactly 6 images',
  },
  isPremium: {
    invalidFormat: 'isPremium must be a boolean',
  },
  houseType: {
    invalidFormat: 'houseType must be apartment, house, room or hotel',
  },
  countRooms: {
    invalidFormat: 'countRooms must be an integer',
    minValue: 'Min length for countRooms path is 1',
    maxValue: 'Max length for countRooms path is 8',
  },
  countGuests: {
    invalidFormat: 'countGuests must be an integer',
    minValue: 'Min length for countGuests path is 1',
    maxValue: 'Max length for countGuests path is 10',
  },
  rentPrice: {
    invalidFormat: 'rentPrice cost must be an integer',
    minValue: 'Minimum rentPrice is 100',
    maxValue: 'Maximum rentPrice is 100000',
  },
  amenities: {
    invalidFormat: 'Field amenities must be an array and type must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
  },
  location: {
    invalidLatitude: 'Latitude must be a valid number',
    invalidLongitude: 'Longitude must be a valid number',
  },
};
