import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    title: 'Homepage',
    loadComponent: () => import('./index').then(c => c.default),
    children: [
      {
        path: 'authenticate',
        title: 'Authenticate user',
        loadComponent: () => import('../pages/authenticate/authenticate.component').then(c => c.AuthenticateComponent),
      },
      {
        path: 'login',
        title: 'Login user',
        loadComponent: () => import('../pages/login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'information',
        title: 'General user information',
        loadComponent: () => import('../pages/information/information.component').then(c => c.InformationComponent),
      },
      {
        path: 'tree',
        title: 'Family tree for user',
        loadComponent: () => import('../pages/tree/tree.component').then(c => c.TreeComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'Not found page',
    component: NotFoundPageComponent,
  }
];
