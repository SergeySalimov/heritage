import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { Store } from '@ngrx/store';

@Component({
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
export class RegisterComponent {
  private store = inject(Store);
}
