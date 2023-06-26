import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginFormComponent, UserLoginInterface } from '../../core/components/login-form/login-form.component';
import { Store } from '@ngrx/store';
import * as fromUser from '../../state/user/user.reducer';
import * as UserActions from '../../state/user/user.actions';
import { Observable } from 'rxjs';
import { LetModule, PushModule } from '@ngrx/component';
import { NgIf } from '@angular/common';
import { LoaderComponent } from '../../core/components/ui-blocks/loader/loader.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    LoginFormComponent,
    LetModule,
    NgIf,
    LoaderComponent,
    PushModule,
  ],
  template: `
    <ng-container *ngrxLet="{ loading: loading$ | ngrxPush } as vm">
      <div class="mt-5">
        <app-login-form [loading]=vm.loading (userLoginChange)="onUserLogin($event)"></app-login-form>
      </div>
      <app-loader *ngIf="vm.loading" class="absolute-center" size="big"></app-loader>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private store = inject(Store);
  loading$: Observable<boolean> = this.store.select(fromUser.selectLoading);
  onUserLogin(user: UserLoginInterface): void {
    this.store.dispatch(UserActions.loginUser({ user }));
  }
}
