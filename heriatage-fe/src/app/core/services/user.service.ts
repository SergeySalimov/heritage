import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegisterInterface } from '../components/register-form/register-form.component';
import { Observable } from 'rxjs';
import { UserLoginInterface } from '../components/login-form/login-form.component';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  static readonly baseURL = 'api/auth';

  registerUser(user: UserRegisterInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${UserService.baseURL}/registration`, user);
  }

  loginUser(user: UserLoginInterface): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${UserService.baseURL}/login`, user);
  }
}
