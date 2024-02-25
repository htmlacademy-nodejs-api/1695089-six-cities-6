import {BaseController, HttpError, HttpMethod} from '../../libs/rest/index.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {Request, Response} from 'express';
import {OfferService} from '../offer/index.js';
import {StatusCodes} from 'http-status-codes';
import {CommentRdo} from './rdo/comment.rdo.js';
import {fillDTO} from '../../helpers/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentsController...');

    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
  }

  public async create({body}: Request, res: Response): Promise<void> {

    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = this.commentService.create(body);
    await this.offerService.incCommentCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }
}
