import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromUser from '../../state/user.reducer';
import { map } from 'rxjs/operators';

@Injectable()
export class NoAuthGuard implements CanActivate {
  store = inject(Store);
  router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select(fromUser.isUserLogged).pipe(
      map((isLogged: boolean) => !isLogged),
      map((isNotLogged: boolean) => isNotLogged ? isNotLogged : this.router.parseUrl('/tree')),
    );
  }
}
