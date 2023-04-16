import { Injectable } from '@angular/core';
import {Category} from "../../models/category.type";
import {Observable, of} from "rxjs";

@Injectable()
export abstract class CategoryService {

  protected constructor() { }

  getAll(): Observable<Category[]> {
    return of([] as Category[])
  }
}
