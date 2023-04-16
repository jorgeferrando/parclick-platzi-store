import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

export interface AdvacedSearchQueryParams {
  searchTerm: string;
  minPrice: number;
  maxPrice: number;
  categoryId: number;
}

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search-page.component.html',
  styleUrls: ['./advanced-search-page.component.sass']
})
export class AdvancedSearchPageComponent {
    searchResults$: Observable<Product[]> = of([] as Product[]);
    searchForm = new FormGroup({
      searchTerm: new FormControl(''),
      minPrice: new FormControl(0),
      maxPrice: new FormControl(0),
      categoryId: new FormControl(0)
    });
    constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
      this.searchResults$ = this.activatedRoute.queryParams.pipe(
        switchMap((params) => this.searchService.search(params))
      );
      this.searchForm.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map(form => {
          let queryParams = {} as Partial<AdvacedSearchQueryParams>;
          if (form?.searchTerm) {
            queryParams.searchTerm = form.searchTerm || undefined;
          }
          if ((form?.minPrice || 0) > 0) {
            queryParams.minPrice = form.minPrice || undefined;
          }
          if ((form?.maxPrice || 0) > 0) {
            queryParams.maxPrice = form.maxPrice || undefined;
          }
          if ((form?.categoryId || 0) > 0) {
            queryParams.categoryId = form.categoryId || undefined;
          }
          return queryParams
        })
      ).subscribe(queryParams => {
        this.router.navigate(['/advanced-search'], { queryParams } as Params);
      })
    }
}
