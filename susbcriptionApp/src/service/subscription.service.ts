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

    private baseUrl = '/api/v1/rest/subscription'; // Ajusta la ruta base según tu configuración

  constructor(private http: HttpClient) {

  } 

  createSubscription(subscription: any): Observable<any> {


    // Realiza la solicitud POST con los encabezados
    return this.http.post<any>('/api/v1/rest/subscription', subscription);
  }

  getsubscription(): Observable<any> {
    return this.http.get<any>('/api/v1/rest/subscription');



  }
}