import { Injectable } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.type";
import {AdvacedSearchQueryParams} from "../pages/advanced-search-page/advanced-search-page.component";

@Injectable()
export class RestSearchService implements SearchService{

  constructor(private http: HttpClient) { }

  search(params: AdvacedSearchQueryParams): Observable<Product> {
    const queryString = Object.keys(params).reduce((acc: string[], curr: string) => {
      const query = `${curr}=${params[curr as keyof AdvacedSearchQueryParams]}`;
      return [...acc, query];
    }, []).join('&');
    return this.http.get(`https://api.escuelajs.co/api/v1/products/?${queryString}`) as Observable<Product>;
  }
}
