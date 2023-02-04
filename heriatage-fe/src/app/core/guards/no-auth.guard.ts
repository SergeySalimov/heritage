import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { isUserLogged } from '../../state/user.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
  store = inject(Store);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(isUserLogged).pipe(
      map((isLogged: boolean) => !isLogged),
      tap((isNotLogged: boolean) => {
        if (!isNotLogged) {
          this.router.navigateByUrl('/tree');
        }
      }),
    );
  }
}
