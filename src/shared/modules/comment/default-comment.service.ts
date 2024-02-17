import {CommentService} from './comment-service.interface.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {inject, injectable} from 'inversify';
import {Component, SortType} from '../../types/index.js';
import {Logger} from '../../libs/logger/index.js';
import {DEFAULT_COMMENT_COUNT} from './comment.constants.js';


@injectable()
export class DefaultCommentService implements CommentService {

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {
  }

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created:${dto.text}`);

    return comment;
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;
    return this.commentModel
      .find({offerId})
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number | null> {
    const result = await this.commentModel.deleteMany({offerId}).exec();

    return result.deletedCount;
  }
}
