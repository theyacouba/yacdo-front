import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(formValue: { email: string, password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, formValue);
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/logout`, null);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): Boolean {
    return !!localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }



}
