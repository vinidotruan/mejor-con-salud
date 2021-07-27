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

  public listAll = (): Observable<Response> => {
    const uri = 'posts';
    return this.get(uri, { orderby: 'date', order: 'desc' });
  };

  public search(
    term: string,
    page?: number,
    orderby?: string
  ): Observable<Response> {
    const uri = `posts`;
    if (page && orderby) {
      return this.get(uri, { search: term, page, orderby });
    } else if (page) {
      return this.get(uri, { search: term, page });
    } else if (orderby) {
      return this.get(uri, { search: term, orderby });
    } else {
      return this.get(uri, { search: term, page, orderby });
    }
  }

  public getById = (id: string) => {
    const uri = `posts/${id}`;
    return this.get(uri);
  };
}
