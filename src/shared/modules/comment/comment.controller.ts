import {
  BaseController, DocumentExistsMiddleware,
  HttpError,
  HttpMethod,
  RequestQuery, ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {Request, Response} from 'express';
import {OfferService} from '../offer/index.js';
import {StatusCodes} from 'http-status-codes';
import {CommentRdo} from './rdo/comment.rdo.js';
import {fillDTO} from '../../helpers/index.js';
import {ParamOfferId} from '../offer/types/param-offerid.type.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)]
    });
    this.addRoute({
      path: '/offerId',
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'id'),
      ]
    });
  }

  public async findByOfferId({params, query}: Request<ParamOfferId, unknown, unknown, RequestQuery>, res: Response) {
    const { offerId } = params;
    const { limit } = query;
    const comments = await this.commentService.findByOfferId(offerId, !isNaN(Number(limit)) ? Number(limit) : undefined);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({body, tokenPayload }: Request, res: Response) {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = this.commentService.create({...body, userId: tokenPayload.id});
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
