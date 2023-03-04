import { bootstrapApplication } from '@angular/platform-browser';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouterStore } from '@ngrx/router-store';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { routes } from './app/routes/routes';
import { userFeature } from './app/state/user.reducer';
import { UserEffects } from './app/state/user.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  getLocalStorage,
  getSessionStorage,
  LOCAL_STORAGE,
  SESSION_STORAGE
} from './app/core/services/storage.service';
import { authInterceptor } from './app/core/interceptors';
import { alertFeature } from './app/state/alert.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
    provideStore(),
    provideState(userFeature),
    provideState(alertFeature),
    provideEffects(UserEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideRouterStore(),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: LOCAL_STORAGE, useFactory: () => getLocalStorage() },
    { provide: SESSION_STORAGE, useFactory: () => getSessionStorage() },
  ],
}).catch(err => console.error(err));
