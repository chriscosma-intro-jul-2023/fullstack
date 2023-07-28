import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import * as fromCounterState from './features/counter/state';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { reducers } from './state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CounterEffects } from './features/counter/state/counter.effects';
import { provideEffects } from '@ngrx/effects';
import { counterRoutes } from './features/counter/counter.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore(reducers),
    provideState(fromCounterState.FEATURE_NAME, fromCounterState.reducers),
    provideEffects([]),
    provideStoreDevtools(),
  ],
};
