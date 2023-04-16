import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {CategoryService} from "../../services/category.service";
import {Category} from "../../models/category.type";

export interface AdvacedSearchQueryParams {
  title: string;
  price_min: number;
  price_max: number;
  categoryId: number;
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search-page.component.html',
  styleUrls: ['./advanced-search-page.component.sass']
})
export class AdvancedSearchPageComponent {
    searchResults$: Observable<Product[]> = of([] as Product[]);
    categories$: Observable<Category[]> = of([] as Category[]);
    constructor(
      private searchService: SearchService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router) {
    }

    ngOnInit() {
      this.categories$ = this.categoryService.getAll();
      this.searchResults$ = this.activatedRoute.queryParams.pipe(
        switchMap((params) => this.searchService.search(params))
      );
    }
    onQueryParams(queryParams: Params) {
      this.router.navigate(['/advanced-search'], { queryParams });
    }
}
