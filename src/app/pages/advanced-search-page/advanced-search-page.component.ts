import { Component } from '@angular/core';
import {SearchService} from "../../services/search.service";
import {ActivatedRoute} from "@angular/router";
import {Observable, of, switchMap} from "rxjs";
import {Product} from "../../models/product.type";

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search-page.component.html',
  styleUrls: ['./advanced-search-page.component.sass']
})
export class AdvancedSearchPageComponent {
    searchResults$: Observable<Product[]> = of([] as Product[]);
    constructor(private searchService: SearchService, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
      this.searchResults$ = this.activatedRoute.queryParams.pipe(
        switchMap((params) => this.searchService.search(params['term']))
      )
    }
}
