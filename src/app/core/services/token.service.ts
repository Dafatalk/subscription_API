import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private tokenSubject: BehaviorSubject<string | null>;

  constructor() {
    const token = localStorage.getItem('access_token');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
  }

  get token$() {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('access_token');
    this.tokenSubject.next(null);
  }

}
