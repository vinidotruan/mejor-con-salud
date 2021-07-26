import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  public get = (uri: string, params?: any): Observable<any> => {
    return this.http.get(uri, { headers: this.getHeaders(), params });
  };

  public post = (uri: string, body?: any): Observable<any> => {
    return this.http.post(uri, body, { headers: this.getHeaders() });
  };

  public getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token',
    });
  }
}
