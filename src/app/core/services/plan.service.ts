import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { Plan } from 'src/app/core/models/plan';
import { Period } from 'src/app/core/models/period';


@Injectable({
    providedIn: 'root'
  })
  export class PlanService{

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

  createPlan(plan: any): Observable<any> {


    // Realiza la solicitud POST con los encabezados
    return this.http.post<any>('/api/v1/rest/plan', plan);
  }
  createPeriod(period: any): Observable<any> {


    // Realiza la solicitud POST con los encabezados
    return this.http.post<any>('/api/v1/rest/period', period);
  }
  getPlan(period:any): Observable<any> {

    const url = `${'/api/v1/rest/plan/list/'}${period}`;
    return this.http.get<any>(url);
  }
  getPlanById(planId:any): Observable<any> {
    const url = `${"/api/v1/rest/plan"}?id=${planId}`;
    return this.http.get<any>(url);
  }
  getPlanByName(name:any): Observable<any> {

    const url = `${'/api/v1/rest/plan/name/'}${name}`;
    return this.http.get<any>(url);
  }


  getPeriod(): Observable<any> {
    return this.http.get<any>('/api/v1/rest/period/list');
  }

  deletPlan(id:any): Observable<String> {

    const url = `${'/api/v1/rest/plan'}?id=${id}`;
    return this.http.delete(url,{ responseType: 'text' });
  }
  editPlan(plan:Plan): Observable<any> {
    return this.http.put<any>('/api/v1/rest/plan', plan);
  }
  deletPeriod(id:any): Observable<String> {

    const url = `${'/api/v1/rest/period'}?id=${id}`;
    return this.http.delete(url,{ responseType: 'text' });
  }
  editPeriod(period:Period): Observable<any> {
    return this.http.put<any>('/api/v1/rest/period', period);
  }

}
