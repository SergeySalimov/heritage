import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { isUserLogged } from '../../state/user.reducer';

@Injectable()
export class AuthGuard implements CanActivate {
  store = inject(Store);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(isUserLogged).pipe(
      tap((isLogged: boolean) => {
        if (!isLogged) {
          this.router.navigateByUrl('/login');
        }
      }),
    );
  }
}
