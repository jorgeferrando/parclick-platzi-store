import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {CategoryService} from "../../repositories/category/category.service";
import {Category} from "../../models/category.type";
import {ProductService} from "../../repositories/product/product.service";
import {AdvacedSearchQueryParams} from "../../models/advanced-search-query-params.type";
import {AppState} from "../../models/app-state.type";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search-page.component.html',
  styleUrls: ['./advanced-search-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchPageComponent {
    appState$: Observable<AppState> = this.activatedRoute.queryParams.pipe(
      switchMap((params) => this.productService.search(params as AdvacedSearchQueryParams).pipe(
        map((value) => ({loading: false, data: value, error: null})),
        catchError((error) => of({loading: false, error: error.message, data: []})),
        startWith({loading: true, data: [], error: null})
      ))
    );
    categories$ = this.categoryService.getAll();
    constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router) {
    }
    onQueryParams(queryParams: Params) {
      this.router.navigate(['/advanced-search'], { queryParams });
    }
}
