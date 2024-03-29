import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { LetModule, PushModule } from '@ngrx/component';
import { Observable } from 'rxjs';
import * as fromUser from '../../state/user/user.reducer';
import * as userActions from '../../state/user/user.actions';
import { LoaderComponent } from '../../core/components/ui-blocks';
import { RegisterFormComponent, UserRegisterInterface } from '../../core/components';

@Component({
  standalone: true,
  imports: [
    RegisterFormComponent,
    LetModule,
    PushModule,
    LoaderComponent,
    NgIf,
  ],
  template: `
    <ng-container *ngrxLet="{ loading: loading$ | ngrxPush } as vm">
      <div class="mt-5">
        <app-register-form [loading]=vm.loading (userRegisterChange)="onUserRegister($event)"></app-register-form>
      </div>
      <app-loader *ngIf="vm.loading" class="absolute-center" size="big"></app-loader>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(fromUser.selectLoading);
  onUserRegister(user: UserRegisterInterface): void {
    this.store.dispatch(userActions.registerUser({ user }));
  }
}
