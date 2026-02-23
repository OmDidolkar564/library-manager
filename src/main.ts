import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';
import {routes} from './app/app.routes'

bootstrapApplication(routes, appConfig)
  .catch((err) => console.error(err));
