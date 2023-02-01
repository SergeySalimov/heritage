import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
  ],
  template: `
    <div class="mt-5">
      <app-login-form></app-login-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private store = inject(Store);
}
