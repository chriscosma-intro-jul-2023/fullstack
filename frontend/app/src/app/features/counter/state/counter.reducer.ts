import { createReducer, on } from '@ngrx/store';
import { CounterEvents } from './counter.actions';

export interface CountState {
  current: number;
}

const initialState: CountState = {
  current: 0,
};

export const reducer = createReducer(
  initialState,
  on(CounterEvents.countIncremented, (oldState) => {
    return { ...oldState, current: oldState.current + 1 };
  }),
  on(CounterEvents.countDecremented, (oldState) => ({
    ...oldState,
    current: oldState.current - 1,
  }))
);
