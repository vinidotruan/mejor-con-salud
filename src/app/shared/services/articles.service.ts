import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends HttpService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public search(term: string): Observable<Response> {
    const url = `https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts`;
    return this.get(url, { search: term });
  }
}
