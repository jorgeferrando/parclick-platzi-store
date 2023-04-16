import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Product} from "../../models/product.type";
import {catchError} from "rxjs/operators";
import {Params} from "@angular/router";
import {AdvacedSearchQueryParams} from "../../models/advanced-search-query-params.type";

export const buildQueryParams = (params: Params) => {
  return Object.keys(params).reduce((acc: string[], curr: string) => {
    const query = `${curr}=${params[curr as keyof AdvacedSearchQueryParams]}`;
    return [...acc, query];
  }, []).join('&');
}

@Injectable()
export class RestProductService {

  constructor(private http: HttpClient) { }

  search(params: AdvacedSearchQueryParams): Observable<Product[]> {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/?${buildQueryParams(params)}`)
      .pipe(
        catchError((err) => {
          return throwError(err);
        })
      ) as Observable<Product | any>;
  }

  getById(id: number) {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ) as Observable<Product> | any;
  }
}
