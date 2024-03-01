import {inject, injectable} from 'inversify';
import {Response, Request} from 'express';
import {
  BaseController,
  HttpError,
  HttpMethod, PrivateRouteMiddleware, UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import {Logger} from '../../libs/logger/index.js';
import {Component} from '../../types/index.js';
import {CreateUserRequest} from './types/create-user-request.type.js';
import {RestSchema} from '../../libs/config/index.js';
import {Config} from 'convict';
import {UserService} from './user-service.interface.js';
import {StatusCodes} from 'http-status-codes';
import {fillDTO} from '../../helpers/index.js';
import {UserRdo} from './rdo/user.rdo.js';
import {LoginUserRequest} from './types/login-user-request.type.js';
import {CreateUserDto} from './dto/create-user.dto.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {AuthService} from '../auth/index.js';
import {LoggedUserRdo} from './rdo/logged-user.rdo.js';
import {PathUser} from './constants/index.js';
import {UploadUserAvatarRdo} from './rdo/upload-user-avatart.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly configService: Config<RestSchema>,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);
    this.logger.info('Register routes for UserController...');

    this.addRoute({
      path: PathUser.Register,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)]
    });
    this.addRoute({
      path: PathUser.Login,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)]
    });
    this.addRoute({
      path: PathUser.Login,
      method: HttpMethod.Get,
      handler: this.checkAuth
    });
    this.addRoute({
      path: PathUser.AddAvatar,
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('userId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
    });
  }

  public async create(
    {body}: CreateUserRequest,
    res: Response,
  ): Promise<void> {

    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        `User with email «${body.email}» exists.`,
        'UserController'
      );
    }

    const result = await this.userService.create(body, this.configService.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login(
    {body}: LoginUserRequest,
    res: Response,
  ): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);
    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async checkAuth({tokenPayload: {email}}: Request, res: Response) {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Unauthorized',
        'UserController'
      );
    }

    this.ok(res, fillDTO(LoggedUserRdo, foundedUser));
  }

  public async uploadAvatar({params, file}: Request, res: Response) {
    const {id} = params;
    const uploadFile = {avatarPath: file?.filename};
    await this.userService.updateById(id, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, {filepath: uploadFile.avatarPath}));
  }
}
