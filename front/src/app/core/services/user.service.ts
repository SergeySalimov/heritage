import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegisterInterface } from '../components/register-form/register-form.component';
import { UserLoginInterface } from '../components/login-form/login-form.component';
import { AUTH_URL_TOKEN } from '../injection-tokens/api.token';
import { TokenData } from '../interfaces/token';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly authUrl = inject(AUTH_URL_TOKEN);

  registerUser(user: UserRegisterInterface): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.authUrl}/registration`, user);
  }

  loginUser(user: UserLoginInterface): Observable<TokenData> {
    return this.http.post<TokenData>(`${this.authUrl}/login`, user);
  }
  // TODO temp method to check token work
  getAllUsers(): Observable<any> {
    return this.http.get('api/users');
  }
}
