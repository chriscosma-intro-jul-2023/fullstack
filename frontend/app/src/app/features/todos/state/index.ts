import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromTodoList from './todo-list.reducer';
import * as fromUiHints from './ui-hints.reducer';
import { TodoListItemModel } from '../models';
export const FEATURE_NAME = 'todosFeature';
export interface TodosState {
  todoList: fromTodoList.TodoListState;
  uiHints: fromUiHints.UiHintsState;
}

export const reducers: ActionReducerMap<TodosState> = {
  todoList: fromTodoList.reducer,
  uiHints: fromUiHints.reducer,
};

const selectFeature = createFeatureSelector<TodosState>(FEATURE_NAME);

const selectTodoListBranch = createSelector(selectFeature, (f) => f.todoList);
const selectUiHintsBranch = createSelector(selectFeature, (f) => f.uiHints);

const { selectAll: selectTodoListItemArray } =
  fromTodoList.adapter.getSelectors(selectTodoListBranch);

export const selectTodoListModel = createSelector(
  selectTodoListItemArray,
  (items) => items as TodoListItemModel[]
);

export const selectTodoListLoaded = createSelector(
  selectUiHintsBranch,
  (h) => h.todoListLoaded
);
