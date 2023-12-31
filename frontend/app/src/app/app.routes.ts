import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { AboutComponent } from './pages/about.component';
import { counterRoutes } from './features/counter/counter.routes';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'todos',
    loadChildren: () =>
      import('./features/todos/todos.routes').then(
        (routes) => routes.todosRoutes
      ),
  },
  ...counterRoutes,
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
