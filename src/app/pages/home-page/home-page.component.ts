import {AfterViewInit, Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap} from "rxjs/operators";
import {SearchService} from "../../services/search.service";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {Product} from "../../models/product.type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements AfterViewInit {
  searchForm = new FormGroup({
    searchTerm: new FormControl('')
  })
  searchResults$: Observable<Product[]> = this.searchForm.valueChanges.pipe(
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => {
      this.loading$.next(true);
      this.error$.next(null) }
    ),
    switchMap((form: any) => {
      return this.searchService.search(form);
    }),
    catchError((err) => {
      this.error$.next(err.message);
      this.loading$.next(false);
      return throwError(err);
    }),
    tap(() => {
      this.loading$.next(false);
    })
  );
  loading$ = new BehaviorSubject(false);
  error$ = new BehaviorSubject(null);
  constructor(private searchService: SearchService, private router: Router) {
  }


  ngAfterViewInit(): void {

  }

  goToAdvancedSearch() {
    this.router.navigate([`advanced-search`], {
      queryParams: {
        term: this.searchForm.value.searchTerm
      }
    });
  }
}
