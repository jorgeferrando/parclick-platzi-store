import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {AdvacedSearchQueryParams} from "../pages/advanced-search-page/advanced-search-page.component";

@Injectable()
export abstract class SearchService {

  protected constructor() { }

  search(params: Partial<AdvacedSearchQueryParams>): Observable<any> {
    return of([]);
  };
}
