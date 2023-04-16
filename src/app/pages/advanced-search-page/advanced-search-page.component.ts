import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {switchMap} from "rxjs/operators";
import {CategoryService} from "../../repositories/category/category.service";
import {Category} from "../../models/category.type";
import {ProductService} from "../../repositories/product/product.service";
import {AdvacedSearchQueryParams} from "../../models/advanced-search-query-params.type";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search-page.component.html',
  styleUrls: ['./advanced-search-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchPageComponent {
    searchResults$: Observable<Product[]> = of([] as Product[]);
    categories$: Observable<Category[]> = of([] as Category[]);
    constructor(
      private productService: ProductService,
      private categoryService: CategoryService,
      private activatedRoute: ActivatedRoute,
      private router: Router) {
    }

    ngOnInit() {
      this.categories$ = this.categoryService.getAll();
      this.searchResults$ = this.activatedRoute.queryParams.pipe(
        switchMap((params) => this.productService.search(params as AdvacedSearchQueryParams))
      );
    }
    onQueryParams(queryParams: Params) {
      this.router.navigate(['/advanced-search'], { queryParams });
    }
}
