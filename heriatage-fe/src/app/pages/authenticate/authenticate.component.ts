import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [
    RegisterFormComponent,
  ],
  template: `
    <div class="mt-5">
      <app-register-form></app-register-form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticateComponent {
  private store = inject(Store);
}
