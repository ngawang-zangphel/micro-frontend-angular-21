import { Routes } from '@angular/router';
import { Home } from './home';
import { loadRemoteComponent } from './micro-frontend';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: Home },
  { path: 'users', loadComponent: () => loadRemoteComponent(4201, 'users') },
  {
    path: 'announcements',
    loadComponent: () => loadRemoteComponent(4202, 'announcements'),
  },
];
