import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { AboutComponent } from './pages/about.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    
    // Match everything else
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
