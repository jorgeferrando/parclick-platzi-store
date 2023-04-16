import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";
import {SearchService} from "../../services/search.service";
import {Observable, of} from "rxjs";
import {Product} from "../../models/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements AfterViewInit {
  searchResults$: Observable<Product[]> = of([] as Product[]);
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  })

  constructor(private searchService: SearchService, private router: Router) {
  }


  ngAfterViewInit(): void {
    this.searchResults$ = this.searchForm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((form: any) => {
        return this.searchService.search(form['searchTerm'] || '');
      })
    )
  }

  goToAdvancedSearch() {
    this.router.navigate([`/advanced-search?term=${this.searchForm.value.searchTerm}`]);
  }
}
