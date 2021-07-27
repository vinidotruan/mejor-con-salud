import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from '../models/response';
import { GenericModalHelperService } from './generic-modal-helper.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends HttpService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  public search(
    term: string,
    page?: number,
    orderby?: string
  ): Observable<Response> {
    const url = `https://api.beta.mejorconsalud.com/wp-json/mc/v2/posts`;
    if (page && orderby) {
      return this.get(url, { search: term, page, orderby });
    } else if (page) {
      return this.get(url, { search: term, page });
    } else if (orderby) {
      return this.get(url, { search: term, orderby });
    } else {
      return this.get(url, { search: term });
    }
  }

  public getById = (id: string) => {
    const url = `https://api.beta.mejorconsalud.com/wp-json/mc/v1/posts/${id}`;
    return this.get(url);
  };
}
