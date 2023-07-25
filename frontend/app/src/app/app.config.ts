import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { reducers } from './state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CounterEffects } from './features/counter/state/counter.effects';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideEffects([]),
    provideStoreDevtools(),
  ],
};
