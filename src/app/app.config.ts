import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideSocketIo, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

const socketConfig: SocketIoConfig = { url: environment.socketUrl, options: {} };

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideSocketIo(socketConfig),
  ]
};
