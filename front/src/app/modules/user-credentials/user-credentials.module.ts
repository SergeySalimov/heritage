import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { UserCredentialsRoutingModule } from './user-credentials-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserCredentialsRoutingModule,
  ],
  declarations: [
    RegistrationComponent,
    AuthenticationComponent,
  ]
})
export class UserCredentialsModule { }
