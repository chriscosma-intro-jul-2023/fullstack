import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FeatureEvents } from './feature.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
import { TodoListItem } from './todo-list.reducer';
import { TodoDocuments, TodosEvents } from './todos.actions';
import { environment } from '../../../../environments/environment';

@Injectable()
export class TodoListEffects {
  private readonly API_URL = environment.apiUrl;

  loadItems$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FeatureEvents.featureEntered),
      switchMap(() =>
        this.httpClient
          .get<{ list: TodoListItem[] }>(this.API_URL + 'todo-list')
          .pipe(
            map((response) => response.list),
            map((payload) => TodoDocuments.todos({ payload }))
          )
      )
    );
  });

  cycleStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosEvents.itemStatusCycled),
      mergeMap(({ payload }) =>
        this.httpClient
          .post<TodoListItem>(this.API_URL + 'todo-list-status-change', payload)
          .pipe(map((payload) => TodoDocuments.todo({ payload })))
      )
    );
  });

  saveTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TodosEvents.itemAdded),
      mergeMap((a) =>
        this.httpClient
          .post<TodoListItem>(this.API_URL + 'todo-list', a.payload)
          .pipe(map((payload) => TodoDocuments.todo({ payload })))
      )
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly httpClient: HttpClient
  ) {}
}
