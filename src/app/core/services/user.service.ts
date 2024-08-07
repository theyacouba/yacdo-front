import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private authUrl = 'http://localhost:8080/auth'

  constructor(private http: HttpClient) { }

  newUser(formValue: any): Observable<any> {
    const user: User = {
      ...formValue
    }

    return this.http.post<any>(`${this.authUrl}/signup`, user);
  }
}
