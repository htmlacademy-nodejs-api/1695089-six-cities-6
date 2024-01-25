import {OfferGenerator} from './offer-generator.interface.js';
import {MockServerData} from '../../types/index.js';
import {getRandomItem, getRandomItems} from '../../helpers/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}
  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const publicationDate = getRandomItem(this.mockData.publicationDates);
    const city = getRandomItem(this.mockData.cities);
    const imagePreview = getRandomItem(this.mockData.imagePreviews);
    const photos = getRandomItem(this.mockData.photos).join(';');
    const premium = getRandomItem(this.mockData.premium);
    const favorites = getRandomItem(this.mockData.favorites);
    const rating = getRandomItem(this.mockData.ratings);
    const houseType = getRandomItem(this.mockData.houseTypes);
    const countRooms = getRandomItem(this.mockData.countRooms);
    const countGuests = getRandomItem(this.mockData.countGuests);
    const rentPrice = getRandomItem(this.mockData.rentPrices);
    const amenities = getRandomItems(this.mockData.amenities);
    const username = getRandomItem(this.mockData.usernames);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarPaths);
    const status = getRandomItem(this.mockData.status);
    const countComments = getRandomItem(this.mockData.countComments);
    const location = getRandomItem(this.mockData.locations).join(';');

    const [firstname, lastname] = username.split(' ');

    return [
      title, description, publicationDate, city, imagePreview,
      photos, premium, favorites, rating, houseType, countRooms,
      countGuests, rentPrice, amenities, firstname, lastname,
      email, avatarPath, status, countComments, location
    ].join('\t');
  }
}
