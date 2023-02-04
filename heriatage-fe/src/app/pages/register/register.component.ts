import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterFormComponent, UserRegisterInterface } from '../../core/components/register-form/register-form.component';
import { Store } from '@ngrx/store';
import { UserApiActions } from '../../state/user.actions';

@Component({
  standalone: true,
  imports: [
    RegisterFormComponent,
  ],
  template: `
    <div class="mt-5">
      <app-register-form (userRegisterChange)="onUserRegister($event)"></app-register-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private store = inject(Store);
  onUserRegister(user: UserRegisterInterface): void {
    this.store.dispatch(UserApiActions.registerUser({ user }));
  }
}
