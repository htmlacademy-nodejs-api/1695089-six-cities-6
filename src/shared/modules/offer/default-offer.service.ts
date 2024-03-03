import {OfferService} from './offer-service.interface.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {Types} from 'mongoose';
import {UserEntity} from '../user/index.js';
import {HttpError} from '../../libs/rest/index.js';
import {StatusCodes} from 'http-status-codes';
import {DEFAULT_OFFER_COUNT, DEFAULT_OFFER_PREMIUM_COUNT} from './constants/index.js';


@injectable()
export class DefaultOfferService implements OfferService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {
  }

  private authorPipeline = [
    {
      $lookup: {
        from: 'users',
        localField: 'authorId',
        foreignField: '_id',
        as: 'users',
      },
    },
    {
      $addFields: {
        author: { $arrayElemAt: ['$users', 0] },
      },
    },
    {
      $unset: ['users'],
    },
  ];

  private commentsLookup = [
    {
      $lookup: {
        from: 'comments',
        localField: '_id',
        foreignField: 'offerId',
        as: 'comments',
      },
    },
    {
      $addFields: {
        commentCount: {$size: '$comments'},
        rating: {$avg: '$comments.rating'},
      }
    },
    {
      $unset: 'comments'
    }
  ];

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string, _userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        {
          $match: {_id: new Types.ObjectId(offerId)}
        },
        ...this.commentsLookup,
        ...this.authorPipeline,
      ])
      .exec();

    return result[0] ?? null;
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel.aggregate([
      ...this.commentsLookup,
      ...this.authorPipeline,
      {$sort: {createdAt: SortType.Down}},
      {$limit: limit},
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
      .exec();
  }

  public async findPremiumByCity(city: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {
        $match: {city: city}
      },
      ...this.commentsLookup,
      {$sort: {createdAt: SortType.Down}},
      {$limit: DEFAULT_OFFER_PREMIUM_COUNT},
    ])
      .exec();
  }

  public async findFavorites(userId: string): Promise<DocumentType<OfferEntity>[]> {

    const user = await this.userModel.findById(userId);

    return this.offerModel.aggregate([
      {
        $match: {
          _id: {$in: user?.favoriteOffers}
        },
      },
      {
        $set: {
          favorites: true,
        },
      },
      {$sort: {createdAt: SortType.Down}},
    ])
      .exec();
  }

  public async toggleFavorite(userId: string, offerId: string, isFavorite: boolean): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with id ${userId} not found.`, 'DefaultOfferService');
    }

    const offerObjectId = new Types.ObjectId(offerId);

    if (!isFavorite) {
      user.favoriteOffers.pull(offerObjectId);

      await user.save();
      return false;
    } else {
      user.favoriteOffers.push(offerObjectId);

      await user.save();
      return true;
    }
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: documentId})) !== null;
  }

  public async isAuthor(
    authorId: string,
    documentId: string
  ): Promise<boolean> {
    const offer = await this.offerModel.findById(documentId);
    return offer?.userId.toString() === authorId;
  }
}
