import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  private tokenSubject: BehaviorSubject<string | null>;
  private userSubject: BehaviorSubject<string | null>;


  constructor() {
    const token = localStorage.getItem('jwtToken');
    const userId = localStorage.getItem('userId');
    this.tokenSubject = new BehaviorSubject<string | null>(token);
    this.userSubject = new BehaviorSubject<string | null>(userId);

  }

  get token$() {
    return this.tokenSubject.asObservable();
  }

  get userId$() {
    return this.userSubject.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
    this.tokenSubject.next(token);
  }

  clearToken() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userId');
    this.tokenSubject.next(null);
  }

  setUserId(id: string) {
    localStorage.setItem('userId', id);
    this.userSubject.next(id);
  }

}
