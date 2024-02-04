import 'reflect-metadata';
import {RestApplication} from './rest/index.js';
import {Container,} from 'inversify';
import {Component} from './shared/types/index.js';
import {createRestApplicationContainer} from './rest/index.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer());

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
