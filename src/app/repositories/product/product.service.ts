import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../models/product.type';
import { AdvacedSearchQueryParams } from '../../models/advanced-search-query-params.type';

@Injectable()
export abstract class ProductService {
  protected constructor() {}

  search(params: AdvacedSearchQueryParams): Observable<Product[]> {
    return of([]);
  }

  getById(id: number): Observable<Product | null> {
    return of(null);
  }
}
