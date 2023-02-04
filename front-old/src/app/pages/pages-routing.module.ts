import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageWrapperComponent } from './page-wrapper/page-wrapper.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PageWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'credentials',
        pathMatch: 'full',
      },
      {
        path: 'credentials',
        loadChildren: () => import('../modules/user-credentials/user-credentials.module').then((m) => m.UserCredentialsModule),
      },
      {
        path: 'information',
        loadChildren: () => import('../modules/information/information.module').then((m) => m.InformationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class PagesRoutingModule {}
