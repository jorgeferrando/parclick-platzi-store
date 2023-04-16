import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {AdvacedSearchQueryParams} from "../../pages/advanced-search-page/advanced-search-page.component";
import {Observable, of} from "rxjs";
import {Category} from "../../models/category.type";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-advanced-filter',
  templateUrl: './advanced-filter.component.html',
  styleUrls: ['./advanced-filter.component.sass']
})
export class AdvancedFilterComponent {
  @Output() queryParams = new EventEmitter();
  @Input() categories: Category[] | null = [];
  searchForm = new FormGroup({
    title: new FormControl(''),
    price_min: new FormControl(0),
    price_max: new FormControl(0),
    categoryId: new FormControl(0)
  });

  constructor() {
  }

  ngOnInit() {
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
      this.queryParams.emit(queryParams);
    })
  }
}
