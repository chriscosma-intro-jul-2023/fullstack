import { createReducer, on } from '@ngrx/store';
import { TodoDocuments, TodosEvents } from './todos.actions';

export interface UiHintsState {
  todoListLoaded: boolean;
}

const initialState: UiHintsState = {
  todoListLoaded: false,
};

export const reducer = createReducer(
  initialState,
  on(TodoDocuments.todos, (s) => ({ ...s, todoListLoaded: true }))
);
