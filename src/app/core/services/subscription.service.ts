import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {SubscriptionRequest} from "../models/subscriptionRequest";


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

    private baseUrl = '/api/v1/rest/subscription';

  constructor(private http: HttpClient) {

  }

  createSubscription(subscription: SubscriptionRequest): Observable<any> {
    console.log("ENTRA A HACER POST")
    return this.http.post<any>('/api/v1/rest/subscription', subscription);
  }

  getsubscription(): Observable<any> {
    return this.http.get<any>('/api/v1/rest/subscription');
  }

  getUserSubscription(userId: any): Observable<any> {
    return this.http.get<any>('/api/v1/rest/subscription/' + userId);
  }

  deleteSubscription(id:any): Observable<String> {
    const url = `${'/api/v1/rest/subscription'}?id=${id}`;
    return this.http.delete(url,{ responseType: 'text' });
  }

}
