import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class userService{

    options = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,' +
            'Content-Type,Authorization',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Vary': 'Origin',
          'Accept': 'application/json',
        }
      };

      
  constructor(private http: HttpClient) {
}

    register(userAndPerson: any ): Observable<any>{
        return this.http.post<any>('http://localhost:8080/register', userAndPerson)
  }
    login(user: any): Observable<any>{
    return this.http.post<any>('http://localhost:8080/authenticate', user)
}
  

  }