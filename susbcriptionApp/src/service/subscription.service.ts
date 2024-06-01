import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
    providedIn: 'root'
  })
  export class SubscriptionService{

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

  createSubscription(subscription: any): Observable<any> {
    // Obtén el token del Local Storage
    const token = localStorage.getItem('jwtToken');

    // Configura los encabezados con el token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJEaWF6IiwiZXhwIjoxNzE3MDI5NTAyLCJpYXQiOjE3MTcwMTE1MDJ9.WOLT7suIYb8jXX7QONQ5XDdtjl0-hI8PXyK1Sb6lg0ZD1FCtktxHd0FurFv1sgsy3YAyXEzvQbp_BVrCzu39gA"}`
    });

    // Realiza la solicitud POST con los encabezados
    return this.http.post<any>('http://localhost:8080/api/v1/rest/subscription', subscription, { headers });
  }

  getPlan(plan: any): Observable<any> {
    // Obtén el token del Local Storage
    const token = localStorage.getItem('jwtToken');
    
    // Configura los encabezados con el token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${"token"}`
    });

    // Realiza la solicitud GET con los encabezados
    return this.http.get<any>('http://localhost:8080/api/v1/rest/subscription', { headers });
  }


}