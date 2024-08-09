import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { User } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    const users = this.getUsers();
    if (users.find(u => u.email === user.email)) {
      return throwError('User already exists');
    }
    user.id = Date.now().toString();
    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    return of(user);
  }

  login(email: string, password: string): Observable<string> {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const token = `token_${user.id}`;
      localStorage.setItem('currentUser', JSON.stringify({ id: user.id, email: user.email, token }));
      return of(token);
    }
    return throwError('Invalid credentials');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser') || '{}')
  }
}
