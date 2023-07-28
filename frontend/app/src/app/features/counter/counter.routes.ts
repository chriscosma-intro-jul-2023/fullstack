import { Routes } from '@angular/router';
import { CounterComponent } from './counter.component';
import { provideState } from '@ngrx/store';
import { FEATURE_NAME, reducers } from './state';
import { CounterEffects } from './state/counter.effects';
import { provideEffects } from '@ngrx/effects';

export const counterRoutes: Routes = [
  {
    path: 'counter',
    component: CounterComponent,
    providers: [provideEffects([CounterEffects])],
  },
];
