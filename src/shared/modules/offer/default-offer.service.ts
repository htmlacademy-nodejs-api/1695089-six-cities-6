import {OfferService} from './offer-service.interface.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {DEFAULT_OFFER_COUNT, DEFAULT_OFFER_PREMIUM_COUNT} from './offer.constants.js';
import {Types} from 'mongoose';


@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    // return this.offerModel
    //   .findById(offerId)
    //   .populate(['userId'])
    //   .exec();

    const result = await this.offerModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(offerId) }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        }
      },
      {
        $addFields: {
          commentCount: {$size: '$comments'},
          totalRating: {$avg: '$comments.rating'},
        }
      },
      {
        $unset: 'comments'
      }
    ])
      .exec();


    return result[0] ?? null;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    // return this.offerModel.find().populate(['userId']).exec();
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'offerId',
          as: 'comments',
        }
      },
      {
        $addFields: {
          commentCount: {$size: '$comments'},
          totalRating: {$avg: '$comments.rating'},
        }
      },
      { $unset: ['comments'] },
      { $sort: { createdAt: SortType.Down } },
      { $limit: limit },
    ])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findPremium(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_PREMIUM_COUNT;
    return this.offerModel
      .find({premium: true})
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .populate(['userId'])
      .exec();
  }

  public async findFavorites(): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({favorites: true})
      .sort({createdAt: SortType.Down})
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        '$inc': {
          commentCount: 1,
        }}).exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }
}