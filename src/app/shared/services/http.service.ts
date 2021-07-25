import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  public get = (uri: string, params?: any): Observable<any> => {
    return this.http.get(uri, { params });
  };

  public post = (uri: string, body?: any): Observable<any> => {
    return this.http.post(uri, body);
  };
}
