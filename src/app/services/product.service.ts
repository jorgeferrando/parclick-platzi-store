import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Product} from "../models/product.type";

@Injectable({
  providedIn: 'root'
})
export abstract class ProductService {

  protected constructor() { }

  getById(id: number): Observable<Product | null> {
    return of(null);
  }
}
