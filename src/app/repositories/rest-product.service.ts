import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of, throwError} from "rxjs";
import {Product} from "../models/product.type";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RestProductService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ) as Observable<Product> | any;
  }
}
