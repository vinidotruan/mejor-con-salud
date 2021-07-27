import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(protected http: HttpClient) {}

  public get = (uri: string, params?: any): Observable<any> => {
    return this.http
      .get<Observable<any>>(uri, { headers: this.getHeaders(), params })
      .pipe(retry(1), catchError(this.handleError));
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
