import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { routes } from './app.routes';
import { provideNativeDateAdapter } from '@angular/material/core';
import localePT from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { provideToastr } from 'ngx-toastr';

registerLocaleData(localePT);

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideNativeDateAdapter(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      tapToDismiss: true,
    }),
  ],
};
