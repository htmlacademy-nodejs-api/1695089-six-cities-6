import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DocumentExists} from '../../types/index.js';

export interface OfferService extends DocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>,
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]>;
  toggleFavorite(userId: string, offerId: string, isFavorite: boolean): Promise<boolean>;
  exists(documentId: string): Promise<boolean>;
  isAuthor(userId: string, documentId: string): Promise<boolean>;
}
