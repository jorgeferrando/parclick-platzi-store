import {AfterViewInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {catchError, debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {Product} from "../../models/product.type";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ProductService} from "../../repositories/product/product.service";

@Component({
  selector: 'app-home-page-component',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,

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
      return this.productService.search(form);
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
  constructor(private productService: ProductService, private router: Router) {
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
