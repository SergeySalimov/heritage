import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FAMILY_URL_TOKEN } from '../injection-tokens/api.token';
import { Observable } from 'rxjs';
import { Family } from '../interfaces/tree';

@Injectable({ providedIn: 'root' })
export class TreeService {
  private http = inject(HttpClient);
  private readonly url = inject(FAMILY_URL_TOKEN);

  loadInitialFamilyUser(userId: string): Observable<Family> {
    return this.http.get<Family>(`${this.url}/${userId}/byUserId`);
  }
}
