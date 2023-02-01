import { Routes } from '@angular/router';
import { NotFoundPageComponent } from '../pages/not-found-page/not-found-page.component';
import { AuthGuard } from './auth.guard';
import { NoAuthGuard } from './no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'Homepage',
    loadComponent: () => import('./index').then(c => c.default),
    providers: [AuthGuard, NoAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'register',
        title: 'User registration',
        canActivate: [NoAuthGuard],
        loadComponent: () => import('../pages/register/register.component').then(c => c.RegisterComponent),
      },
      {
        path: 'login',
        title: 'Login user',
        canActivate: [NoAuthGuard],
        loadComponent: () => import('../pages/login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'information',
        title: 'General user information',
        canActivate: [AuthGuard],
        loadComponent: () => import('../pages/information/information.component').then(c => c.InformationComponent),
      },
      {
        path: 'tree',
        title: 'Family tree for user',
        canActivate: [AuthGuard],
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
