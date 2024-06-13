import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class PeriodService{

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

    private baseUrl = '/api/v1/rest/period';

  constructor(private http: HttpClient) {

  }

  getPeriodById(id:any): Observable<any> {
    const url = `${"/api/v1/rest/period"}?id=${id}`;
    return this.http.get<any>(url);
  }

}
