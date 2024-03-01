import {
  BaseController, DocumentExistsMiddleware,
  HttpMethod, PrivateRouteMiddleware,
  RequestQuery, ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {Request, Response} from 'express';
import {OfferService} from '../offer/index.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {fillDTO} from '../../helpers/index.js';
import {ParamOfferId} from '../offer/types/param-offerid.type.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {CreateCommentRequest} from './types/create-comment-request.type.js';
import {PathComments} from './constants/index.js';

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
      path: PathComments.create,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    this.addRoute({
      path: PathComments.findById,
      method: HttpMethod.Get,
      handler: this.findByOfferId,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId'),
      ]
    });
  }

  public async findByOfferId({params, query}: Request<ParamOfferId, unknown, unknown, RequestQuery>, res: Response) {
    const { offerId } = params;
    const { limit } = query;
    const comments = await this.commentService.findByOfferId(offerId, !isNaN(Number(limit)) ? Number(limit) : undefined);
    this.ok(res, fillDTO(CommentRdo, comments));
  }

  public async create({body, tokenPayload }: CreateCommentRequest, res: Response) {

    const comment = await this.commentService.create({...body, userId: tokenPayload.id});

    this.created(res, fillDTO(CommentRdo, comment));
  }
}
