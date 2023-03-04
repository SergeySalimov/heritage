import { inject, InjectionToken } from '@angular/core';

export const BASE_URL_TOKEN = new InjectionToken<string>('base url for requests', {
  providedIn: 'root',
  factory: () => 'api',
});

export const AUTH_URL_TOKEN = new InjectionToken<string>('auth url', {
  providedIn: 'root',
  factory: () => {
    const baseUrl = inject(BASE_URL_TOKEN);
    return `${baseUrl}/auth`;
  },
});
