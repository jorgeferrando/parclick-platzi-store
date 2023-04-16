import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";

@Injectable()
export abstract class SearchService {

  protected constructor() { }

  search(term: string): Observable<any> {
    return of([]);
  };
}
