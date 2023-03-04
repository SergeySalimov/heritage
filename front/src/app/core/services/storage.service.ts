import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// { provide: LOCAL_STORAGE, useFactory: () => getLocalStorage() }
export const LOCAL_STORAGE = new InjectionToken<Storage>('heritageLocalStorage');

// { provide: SESSION_STORAGE, useFactory: () => getSessionStorage() }
export const SESSION_STORAGE = new InjectionToken<Storage>('heritageSessionStorage');

export function getLocalStorage(): any {
  return typeof window !== 'undefined' ? window.localStorage : null;
}

export function getSessionStorage(): any {
  return typeof window !== 'undefined' ? window.sessionStorage : null;
}

export const TOKEN_STORAGE_KEY = new InjectionToken<string>('token storage key', {
  providedIn: 'root',
  factory: () => 'heritage-store-token',
});

export enum StorageType {
  Local = 'Local',
  Session = 'Session'
}

@Injectable({ providedIn: 'root' })
export class StorageService {
  private localStorage: Storage = inject(LOCAL_STORAGE);
  private sessionStorage: Storage = inject(SESSION_STORAGE);
  private platformId: Object = inject(PLATFORM_ID);

  private readonly storageAccessible: boolean;
  private readonly storageMap: Map<StorageType, Storage> = new Map()

  constructor() {
    this.storageMap.set(StorageType.Local, this.localStorage);
    this.storageMap.set(StorageType.Session, this.sessionStorage);
    this.storageAccessible = isPlatformBrowser(this.platformId);
  }

  get<T = string>(key: string, storageType: StorageType): T | null {
    if (!this.storageAccessible) {
      return null;
    }

    const storedValue = this.storageMap.get(storageType)?.getItem(key);
    if (storedValue == null) {
      return null;
    }

    try {
      const storedObj = JSON.parse(storedValue);
      if (!Object.hasOwn(storedObj, 'invalidAt')) {
        return storedObj;
      }
      if (!storedObj.invalidAt) {
        return storedObj.value;
      }

      const invalidAt: number = new Date(storedObj.invalidAt).getTime();
      const now: number = new Date().getTime();
      if (invalidAt > now) {
        return storedObj.value;
      }

      this.delete(key, storageType);
      return null;

    } catch {

      return storedValue as T | null;

    }
  }

  set<T = string>(key: string, value: T, storageType: StorageType, expDate?: number|null): void {
    if (!this.storageAccessible) {
      return;
    }

    if (expDate != null) {
      const invalidAt: Date = new Date(expDate);
      this.storageMap.get(storageType)?.setItem(key, JSON.stringify({ invalidAt, value }));
      return;
    }

    this.storageMap.get(storageType)?.setItem(key, JSON.stringify(value));
  }

  delete(key: string, storageType: StorageType): void {
    if (!this.storageAccessible) {
      return;
    }
    this.storageMap.get(storageType)?.removeItem(key);
  }

  deleteAll(storageType: StorageType): void {
    if (!this.storageAccessible) {
      return;
    }
    this.storageMap.get(storageType)?.clear();
  }
}
