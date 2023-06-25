import { inject } from '@angular/core';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService, StorageType, TOKEN_STORAGE_KEY } from '../services/storage.service';
import { AUTH_URL_TOKEN } from '../services/tokens';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/state/user/user.actions';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authUrl = inject(AUTH_URL_TOKEN);
  if (req.url.startsWith(authUrl)) {
    return next(req);
  }
  // Get the auth token from the service.
  const storageService = inject(StorageService);
  const tokeKeyInStorage = inject(TOKEN_STORAGE_KEY);
  const token = storageService.get(tokeKeyInStorage, StorageType.Session);
  if (!token) {
    inject(Store).dispatch(UserActions.tokenExpired());
    return next(req);
  }
  // Clone the request and replace the original headers with
  // cloned headers, updated with the authorization.
  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });
  // send cloned request with header to the next handler.
  return next(authReq);
}
