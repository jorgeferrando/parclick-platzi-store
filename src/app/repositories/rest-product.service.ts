import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Product} from "../models/product.type";

@Injectable({
  providedIn: 'root'
})
export class RestProductService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get(`https://api.escuelajs.co/api/v1/products/${id}`) as Observable<Product>;
  }
}
