import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map, switchMap} from "rxjs/operators";

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
    searchForm = new FormGroup({
      title: new FormControl(''),
      price_min: new FormControl(0),
      price_max: new FormControl(0),
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
          queryParams.title = form.title || undefined;
          if ((form.price_min || 0) < (form.price_max || 0)) {
            queryParams.price_min = form.price_min || 0;
            queryParams.price_max = form.price_max || 0;
          }
          queryParams.categoryId = form.categoryId || undefined;
          return queryParams
        })
      ).subscribe(queryParams => {
        this.router.navigate(['/advanced-search'], { queryParams });
      })
    }
}
