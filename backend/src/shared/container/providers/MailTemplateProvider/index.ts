import { container } from 'tsyringe';

import IMailTemplateProvider from './models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './implementations/HandlebarsMailTemplateProvider';

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  new HandlebarsMailTemplateProvider()
);
