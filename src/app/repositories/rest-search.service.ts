import { Injectable } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.type";
import {AdvacedSearchQueryParams} from "../pages/advanced-search-page/advanced-search-page.component";
import {catchError} from "rxjs/operators";
import {Params} from "@angular/router";

export const buildQueryParams = (params: Params) => {
  return Object.keys(params).reduce((acc: string[], curr: string) => {
    const query = `${curr}=${params[curr as keyof AdvacedSearchQueryParams]}`;
    return [...acc, query];
  }, []).join('&');
}

@Injectable()
export class RestSearchService implements SearchService{

  constructor(private http: HttpClient) { }

  search(params: AdvacedSearchQueryParams): Observable<Product> {

    return this.http.get(`https://api.escuelajs.co/api/v1/products/?${buildQueryParams(params)}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      ) as Observable<Product | any>;
  }
}
