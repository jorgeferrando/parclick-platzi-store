import { Injectable } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product.type";

@Injectable()
export class RestSearchService implements SearchService{

  constructor(private http: HttpClient) { }

  search(term: string): Observable<Product> {
    return this.http.get(`https://api.escuelajs.co/api/v1/products?title=${term}`) as Observable<Product>;
  }
}
