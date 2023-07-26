import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromTodoList from './todo-list.reducer';
import { TodoListItemModel } from '../models';
export const FEATURE_NAME = 'todosFeature';
export interface TodosState {
  todoList: fromTodoList.TodoListState;
}

export const reducers: ActionReducerMap<TodosState> = {
  todoList: fromTodoList.reducer,
};

const selectFeature = createFeatureSelector<TodosState>(FEATURE_NAME);
const selectTodoListBranch = createSelector(selectFeature, (f) => f.todoList);
const { selectAll: selectTodoListItemArray } =
  fromTodoList.adapter.getSelectors(selectTodoListBranch);

export const selectTodoListModel = createSelector(
  selectTodoListItemArray,
  (items) => items as TodoListItemModel[]
);
