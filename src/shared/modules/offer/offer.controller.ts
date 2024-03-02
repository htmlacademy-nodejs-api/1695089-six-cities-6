import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod, PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../types/index.js';
import {inject, injectable} from 'inversify';
import {Request, Response} from 'express';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {fillDTO} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer.rdo.js';
import {UpdateOfferRequest} from './types/update-offer-request.type.js';
import {StatusCodes} from 'http-status-codes';
import {CreateOfferRequest} from './types/create-offer-requset.type.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {ParamOfferId} from './types/param-offerid.type.js';


@injectable()
export class OfferController extends BaseController {

  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Put,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'offerId'),
      ]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    {body, tokenPayload}: CreateOfferRequest,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async update({body, params}: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = this.offerService.updateById(String(params.offerId), body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({params}: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.offerId);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.offerId}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

  public async show({ params, tokenPayload }: Request<ParamOfferId>, res: Response): Promise<void> {
    const { offerId } = params;
    const userId = tokenPayload?.id;
    const offer = await this.offerService.findById(offerId, userId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }
}
