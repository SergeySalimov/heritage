import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authenticate',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },

  {
    path: 'authenticate',
    component: AuthenticationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [],
})
export class UserCredentialsRoutingModule {}
