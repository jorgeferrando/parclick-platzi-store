import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {Category} from "../models/category.type";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable()
export class RestCategoryService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {
    return this.http.get(`https://api.escuelajs.co/api/v1/categories`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    ) as Observable<Category[]> | any;
  }
}
