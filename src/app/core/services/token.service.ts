import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private tokenSubject: BehaviorSubject<string | null>;

  constructor() {
    const token = localStorage.getItem('jwtToken');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
  }

  get token$() {
    return this.tokenSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('jwtToken');
    this.tokenSubject.next(null);
  }

}
